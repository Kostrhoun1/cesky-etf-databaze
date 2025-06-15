
import DOMPurify from 'dompurify';

export const sanitizeHTML = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'img'],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target', 'rel'],
    ALLOW_DATA_ATTR: false,
    ADD_ATTR: ['target', 'rel'],
    FORCE_BODY: true
  });
};

export const sanitizeText = (text: string): string => {
  return DOMPurify.sanitize(text, { ALLOWED_TAGS: [] });
};
