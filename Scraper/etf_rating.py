"""
ETF Rating Calculator - Python version
Translates the TypeScript rating algorithm for use in scraping pipeline
"""

from datetime import datetime
from typing import Dict, Any, Optional

# Top-tier fund providers (get bonus points)
TOP_PROVIDERS = [
    'iShares', 'Vanguard', 'Xtrackers', 'Amundi', 'SPDR', 'Invesco'
]

def get_years_since_inception(inception_date_str: Optional[str]) -> float:
    """Calculate years since inception"""
    if not inception_date_str:
        return 0.0
    
    try:
        inception = datetime.strptime(inception_date_str, '%Y-%m-%d')
        now = datetime.now()
        return (now - inception).days / 365.25
    except:
        return 0.0

def score_ter(ter: float) -> int:
    """Score TER (0-25 points): Lower TER is better
    Input: TER as percentage (0.07 for 0.07%, not 0.0007)
    """
    if ter <= 0.05:  # <= 0.05%
        return 25
    elif ter <= 0.10:  # <= 0.10%
        return 22
    elif ter <= 0.15:  # <= 0.15%
        return 19
    elif ter <= 0.25:  # <= 0.25%
        return 15
    elif ter <= 0.50:  # <= 0.50%
        return 10
    elif ter <= 0.75:  # <= 0.75%
        return 5
    else:  # > 0.75%
        return 1

def score_fund_size(size_in_million: float) -> int:
    """Score Fund Size (0-20 points): Larger funds are more stable
    Input: size in millions EUR (as stored in database)
    """
    size_in_billion = size_in_million / 1000.0  # Convert to billions
    
    if size_in_billion >= 50:
        return 20    # >= 50B = Excellent
    elif size_in_billion >= 20:
        return 18    # >= 20B = Very Good
    elif size_in_billion >= 10:
        return 16    # >= 10B = Good
    elif size_in_billion >= 5:
        return 14    # >= 5B = Above Average
    elif size_in_billion >= 1:
        return 12    # >= 1B = Average
    elif size_in_billion >= 0.5:
        return 8     # >= 500M = Below Average
    elif size_in_billion >= 0.1:
        return 4     # >= 100M = Poor
    else:
        return 1     # < 100M = Very Poor

def score_track_record(years: float) -> int:
    """Score Track Record (0-15 points): Longer history is better"""
    if years >= 15:
        return 15    # >= 15 years = Excellent
    elif years >= 10:
        return 13    # >= 10 years = Very Good
    elif years >= 7:
        return 11    # >= 7 years = Good
    elif years >= 5:
        return 9     # >= 5 years = Above Average
    elif years >= 3:
        return 6     # >= 3 years = Average
    elif years >= 1:
        return 3     # >= 1 year = Below Average
    else:
        return 1     # < 1 year = Poor

def score_provider(provider: str) -> int:
    """Score Fund Provider (0-15 points): Top providers get bonus"""
    if not provider:
        return 8
    
    provider_lower = provider.lower()
    
    for top_provider in TOP_PROVIDERS:
        if top_provider.lower() in provider_lower:
            return 15  # Top provider bonus
    
    return 8  # Standard provider

def score_performance(etf_data: Dict[str, Any]) -> int:
    """Score Performance (0-15 points): Risk-adjusted returns and consistency"""
    return_3y = etf_data.get('return_3y', 0) or 0
    return_per_risk_3y = etf_data.get('return_per_risk_3y', 0) or 0
    
    score = 8  # Base score
    
    # Bonus for good 3-year returns (convert from decimal to percentage for comparison)
    return_3y_pct = return_3y * 100 if return_3y and return_3y < 1 else return_3y
    
    if return_3y_pct > 15:
        score += 4      # > 15% = Excellent
    elif return_3y_pct > 10:
        score += 3      # > 10% = Very Good
    elif return_3y_pct > 7:
        score += 2      # > 7% = Good
    elif return_3y_pct > 5:
        score += 1      # > 5% = Average
    
    # Bonus for good risk-adjusted returns
    if return_per_risk_3y > 0.5:
        score += 3
    elif return_per_risk_3y > 0.3:
        score += 2
    elif return_per_risk_3y > 0.1:
        score += 1
    
    return min(score, 15)

def score_tracking(tracking_error: Optional[float]) -> int:
    """Score Tracking Quality (0-10 points): Lower tracking error is better"""
    if not tracking_error or tracking_error <= 0:
        return 10  # Perfect or no data
    elif tracking_error <= 0.001:  # <= 0.1%
        return 10
    elif tracking_error <= 0.002:  # <= 0.2%
        return 8
    elif tracking_error <= 0.005:  # <= 0.5%
        return 6
    elif tracking_error <= 0.010:  # <= 1.0%
        return 4
    elif tracking_error <= 0.020:  # <= 2.0%
        return 2
    else:  # > 2.0%
        return 1

def calculate_etf_rating(etf_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Calculate comprehensive ETF rating based on database data
    Returns dict with rating (1-5), score (0-100), and breakdown
    """
    
    # Extract data with safe defaults
    ter = etf_data.get('ter_numeric', 0) or 0
    fund_size_numeric = etf_data.get('fund_size_numeric', 0) or 0
    provider = etf_data.get('fund_provider', '') or ''
    inception_date = etf_data.get('inception_date', '')
    tracking_error = etf_data.get('tracking_error', 0)
    
    years = get_years_since_inception(inception_date)
    
    # Calculate individual scores
    ter_score = score_ter(ter)
    size_score = score_fund_size(fund_size_numeric)
    track_record_score = score_track_record(years)
    provider_score = score_provider(provider)
    performance_score = score_performance(etf_data)
    tracking_score = score_tracking(tracking_error)
    
    # Total score (max 100)
    total_score = (
        ter_score + size_score + track_record_score + 
        provider_score + performance_score + tracking_score
    )
    
    # Convert score to star rating
    if total_score >= 85:
        rating = 5      # 85+ = 5 stars (Excellent)
    elif total_score >= 70:
        rating = 4      # 70-84 = 4 stars (Very Good)
    elif total_score >= 55:
        rating = 3      # 55-69 = 3 stars (Good)
    elif total_score >= 40:
        rating = 2      # 40-54 = 2 stars (Average)
    else:
        rating = 1      # < 40 = 1 star (Poor)
    
    return {
        'rating': rating,
        'rating_score': total_score,
        'rating_breakdown': {
            'ter': ter_score,
            'fund_size': size_score,
            'track_record': track_record_score,
            'provider': provider_score,
            'performance': performance_score,
            'tracking': tracking_score
        }
    }

def get_rating_category(rating: int) -> str:
    """Get rating category description"""
    categories = {
        5: 'excellent',
        4: 'very-good', 
        3: 'good',
        2: 'average',
        1: 'poor'
    }
    return categories.get(rating, 'unknown')

def get_rating_description(rating: int) -> str:
    """Get rating description in Czech"""
    descriptions = {
        5: 'Vynikající - TOP volba pro portfolia',
        4: 'Velmi dobrý - Kvalitní fond s dobrými parametry',
        3: 'Dobrý - Solidní volba s mírnými kompromisy',
        2: 'Průměrný - Vhodný pro specifické potřeby',
        1: 'Slabý - Zvážit alternativy'
    }
    return descriptions.get(rating, 'Nehodnoceno')

if __name__ == "__main__":
    # Test the rating system
    test_etf = {
        'name': 'iShares Core S&P 500 UCITS ETF',
        'ter_numeric': 0.0007,  # 0.07%
        'fund_size_numeric': 74800,  # 74.8B EUR in millions
        'fund_provider': 'iShares',
        'inception_date': '2010-09-19',
        'return_3y': 0.12,  # 12%
        'return_per_risk_3y': 0.6,
        'tracking_error': 0.0005  # 0.05%
    }
    
    result = calculate_etf_rating(test_etf)
    print(f"Test ETF Rating: {result['rating']}/5 stars")
    print(f"Score: {result['rating_score']}/100")
    print(f"Description: {get_rating_description(result['rating'])}")
    print(f"Breakdown: {result['rating_breakdown']}")