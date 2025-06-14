export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      etf_funds: {
        Row: {
          beta: number | null
          category: string | null
          correlation: number | null
          country_1_name: string | null
          country_1_weight: number | null
          country_2_name: string | null
          country_2_weight: number | null
          country_3_name: string | null
          country_3_weight: number | null
          country_4_name: string | null
          country_4_weight: number | null
          country_5_name: string | null
          country_5_weight: number | null
          created_at: string
          current_price: number | null
          description_cs: string | null
          description_en: string | null
          distribution_frequency: string | null
          distribution_policy: string | null
          exchange_1_bloomberg: string | null
          exchange_1_currency: string | null
          exchange_1_market_maker: string | null
          exchange_1_name: string | null
          exchange_1_reuters: string | null
          exchange_1_ticker: string | null
          exchange_2_bloomberg: string | null
          exchange_2_currency: string | null
          exchange_2_market_maker: string | null
          exchange_2_name: string | null
          exchange_2_reuters: string | null
          exchange_2_ticker: string | null
          exchange_3_bloomberg: string | null
          exchange_3_currency: string | null
          exchange_3_market_maker: string | null
          exchange_3_name: string | null
          exchange_3_reuters: string | null
          exchange_3_ticker: string | null
          exchange_4_bloomberg: string | null
          exchange_4_currency: string | null
          exchange_4_market_maker: string | null
          exchange_4_name: string | null
          exchange_4_reuters: string | null
          exchange_4_ticker: string | null
          exchange_5_bloomberg: string | null
          exchange_5_currency: string | null
          exchange_5_market_maker: string | null
          exchange_5_name: string | null
          exchange_5_reuters: string | null
          exchange_5_ticker: string | null
          fund_currency: string | null
          fund_domicile: string | null
          fund_provider: string | null
          fund_size: string | null
          fund_size_currency: string | null
          fund_size_numeric: number | null
          holding_1_name: string | null
          holding_1_weight: number | null
          holding_10_name: string | null
          holding_10_weight: number | null
          holding_2_name: string | null
          holding_2_weight: number | null
          holding_3_name: string | null
          holding_3_weight: number | null
          holding_4_name: string | null
          holding_4_weight: number | null
          holding_5_name: string | null
          holding_5_weight: number | null
          holding_6_name: string | null
          holding_6_weight: number | null
          holding_7_name: string | null
          holding_7_weight: number | null
          holding_8_name: string | null
          holding_8_weight: number | null
          holding_9_name: string | null
          holding_9_weight: number | null
          id: string
          inception_date: string | null
          index_name: string | null
          information_ratio: number | null
          investment_focus: string | null
          isin: string
          last_price_update: string | null
          legal_structure: string | null
          max_drawdown_1y: number | null
          max_drawdown_3y: number | null
          max_drawdown_5y: number | null
          max_drawdown_inception: number | null
          name: string | null
          primary_exchange: string | null
          primary_ticker: string | null
          replication: string | null
          retry_count: number | null
          return_10y_percent: number | null
          return_1y: number | null
          return_1y_percent: number | null
          return_3y: number | null
          return_3y_percent: number | null
          return_5y: number | null
          return_5y_percent: number | null
          return_per_risk_1y: number | null
          return_per_risk_3y: number | null
          return_per_risk_5y: number | null
          return_ytd: number | null
          scraping_date: string | null
          scraping_status: string | null
          sector_1_name: string | null
          sector_1_weight: number | null
          sector_2_name: string | null
          sector_2_weight: number | null
          sector_3_name: string | null
          sector_3_weight: number | null
          sector_4_name: string | null
          sector_4_weight: number | null
          sector_5_name: string | null
          sector_5_weight: number | null
          sustainability: string | null
          ter: string | null
          ter_numeric: number | null
          total_exchanges: number | null
          total_holdings: number | null
          tracking_error: number | null
          updated_at: string
          url: string | null
          volatility_1y: number | null
          volatility_3y: number | null
          volatility_5y: number | null
          ytd_return_percent: number | null
        }
        Insert: {
          beta?: number | null
          category?: string | null
          correlation?: number | null
          country_1_name?: string | null
          country_1_weight?: number | null
          country_2_name?: string | null
          country_2_weight?: number | null
          country_3_name?: string | null
          country_3_weight?: number | null
          country_4_name?: string | null
          country_4_weight?: number | null
          country_5_name?: string | null
          country_5_weight?: number | null
          created_at?: string
          current_price?: number | null
          description_cs?: string | null
          description_en?: string | null
          distribution_frequency?: string | null
          distribution_policy?: string | null
          exchange_1_bloomberg?: string | null
          exchange_1_currency?: string | null
          exchange_1_market_maker?: string | null
          exchange_1_name?: string | null
          exchange_1_reuters?: string | null
          exchange_1_ticker?: string | null
          exchange_2_bloomberg?: string | null
          exchange_2_currency?: string | null
          exchange_2_market_maker?: string | null
          exchange_2_name?: string | null
          exchange_2_reuters?: string | null
          exchange_2_ticker?: string | null
          exchange_3_bloomberg?: string | null
          exchange_3_currency?: string | null
          exchange_3_market_maker?: string | null
          exchange_3_name?: string | null
          exchange_3_reuters?: string | null
          exchange_3_ticker?: string | null
          exchange_4_bloomberg?: string | null
          exchange_4_currency?: string | null
          exchange_4_market_maker?: string | null
          exchange_4_name?: string | null
          exchange_4_reuters?: string | null
          exchange_4_ticker?: string | null
          exchange_5_bloomberg?: string | null
          exchange_5_currency?: string | null
          exchange_5_market_maker?: string | null
          exchange_5_name?: string | null
          exchange_5_reuters?: string | null
          exchange_5_ticker?: string | null
          fund_currency?: string | null
          fund_domicile?: string | null
          fund_provider?: string | null
          fund_size?: string | null
          fund_size_currency?: string | null
          fund_size_numeric?: number | null
          holding_1_name?: string | null
          holding_1_weight?: number | null
          holding_10_name?: string | null
          holding_10_weight?: number | null
          holding_2_name?: string | null
          holding_2_weight?: number | null
          holding_3_name?: string | null
          holding_3_weight?: number | null
          holding_4_name?: string | null
          holding_4_weight?: number | null
          holding_5_name?: string | null
          holding_5_weight?: number | null
          holding_6_name?: string | null
          holding_6_weight?: number | null
          holding_7_name?: string | null
          holding_7_weight?: number | null
          holding_8_name?: string | null
          holding_8_weight?: number | null
          holding_9_name?: string | null
          holding_9_weight?: number | null
          id?: string
          inception_date?: string | null
          index_name?: string | null
          information_ratio?: number | null
          investment_focus?: string | null
          isin: string
          last_price_update?: string | null
          legal_structure?: string | null
          max_drawdown_1y?: number | null
          max_drawdown_3y?: number | null
          max_drawdown_5y?: number | null
          max_drawdown_inception?: number | null
          name?: string | null
          primary_exchange?: string | null
          primary_ticker?: string | null
          replication?: string | null
          retry_count?: number | null
          return_10y_percent?: number | null
          return_1y?: number | null
          return_1y_percent?: number | null
          return_3y?: number | null
          return_3y_percent?: number | null
          return_5y?: number | null
          return_5y_percent?: number | null
          return_per_risk_1y?: number | null
          return_per_risk_3y?: number | null
          return_per_risk_5y?: number | null
          return_ytd?: number | null
          scraping_date?: string | null
          scraping_status?: string | null
          sector_1_name?: string | null
          sector_1_weight?: number | null
          sector_2_name?: string | null
          sector_2_weight?: number | null
          sector_3_name?: string | null
          sector_3_weight?: number | null
          sector_4_name?: string | null
          sector_4_weight?: number | null
          sector_5_name?: string | null
          sector_5_weight?: number | null
          sustainability?: string | null
          ter?: string | null
          ter_numeric?: number | null
          total_exchanges?: number | null
          total_holdings?: number | null
          tracking_error?: number | null
          updated_at?: string
          url?: string | null
          volatility_1y?: number | null
          volatility_3y?: number | null
          volatility_5y?: number | null
          ytd_return_percent?: number | null
        }
        Update: {
          beta?: number | null
          category?: string | null
          correlation?: number | null
          country_1_name?: string | null
          country_1_weight?: number | null
          country_2_name?: string | null
          country_2_weight?: number | null
          country_3_name?: string | null
          country_3_weight?: number | null
          country_4_name?: string | null
          country_4_weight?: number | null
          country_5_name?: string | null
          country_5_weight?: number | null
          created_at?: string
          current_price?: number | null
          description_cs?: string | null
          description_en?: string | null
          distribution_frequency?: string | null
          distribution_policy?: string | null
          exchange_1_bloomberg?: string | null
          exchange_1_currency?: string | null
          exchange_1_market_maker?: string | null
          exchange_1_name?: string | null
          exchange_1_reuters?: string | null
          exchange_1_ticker?: string | null
          exchange_2_bloomberg?: string | null
          exchange_2_currency?: string | null
          exchange_2_market_maker?: string | null
          exchange_2_name?: string | null
          exchange_2_reuters?: string | null
          exchange_2_ticker?: string | null
          exchange_3_bloomberg?: string | null
          exchange_3_currency?: string | null
          exchange_3_market_maker?: string | null
          exchange_3_name?: string | null
          exchange_3_reuters?: string | null
          exchange_3_ticker?: string | null
          exchange_4_bloomberg?: string | null
          exchange_4_currency?: string | null
          exchange_4_market_maker?: string | null
          exchange_4_name?: string | null
          exchange_4_reuters?: string | null
          exchange_4_ticker?: string | null
          exchange_5_bloomberg?: string | null
          exchange_5_currency?: string | null
          exchange_5_market_maker?: string | null
          exchange_5_name?: string | null
          exchange_5_reuters?: string | null
          exchange_5_ticker?: string | null
          fund_currency?: string | null
          fund_domicile?: string | null
          fund_provider?: string | null
          fund_size?: string | null
          fund_size_currency?: string | null
          fund_size_numeric?: number | null
          holding_1_name?: string | null
          holding_1_weight?: number | null
          holding_10_name?: string | null
          holding_10_weight?: number | null
          holding_2_name?: string | null
          holding_2_weight?: number | null
          holding_3_name?: string | null
          holding_3_weight?: number | null
          holding_4_name?: string | null
          holding_4_weight?: number | null
          holding_5_name?: string | null
          holding_5_weight?: number | null
          holding_6_name?: string | null
          holding_6_weight?: number | null
          holding_7_name?: string | null
          holding_7_weight?: number | null
          holding_8_name?: string | null
          holding_8_weight?: number | null
          holding_9_name?: string | null
          holding_9_weight?: number | null
          id?: string
          inception_date?: string | null
          index_name?: string | null
          information_ratio?: number | null
          investment_focus?: string | null
          isin?: string
          last_price_update?: string | null
          legal_structure?: string | null
          max_drawdown_1y?: number | null
          max_drawdown_3y?: number | null
          max_drawdown_5y?: number | null
          max_drawdown_inception?: number | null
          name?: string | null
          primary_exchange?: string | null
          primary_ticker?: string | null
          replication?: string | null
          retry_count?: number | null
          return_10y_percent?: number | null
          return_1y?: number | null
          return_1y_percent?: number | null
          return_3y?: number | null
          return_3y_percent?: number | null
          return_5y?: number | null
          return_5y_percent?: number | null
          return_per_risk_1y?: number | null
          return_per_risk_3y?: number | null
          return_per_risk_5y?: number | null
          return_ytd?: number | null
          scraping_date?: string | null
          scraping_status?: string | null
          sector_1_name?: string | null
          sector_1_weight?: number | null
          sector_2_name?: string | null
          sector_2_weight?: number | null
          sector_3_name?: string | null
          sector_3_weight?: number | null
          sector_4_name?: string | null
          sector_4_weight?: number | null
          sector_5_name?: string | null
          sector_5_weight?: number | null
          sustainability?: string | null
          ter?: string | null
          ter_numeric?: number | null
          total_exchanges?: number | null
          total_holdings?: number | null
          tracking_error?: number | null
          updated_at?: string
          url?: string | null
          volatility_1y?: number | null
          volatility_3y?: number | null
          volatility_5y?: number | null
          ytd_return_percent?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
