export enum EmbedColors {
  SUCCESS = 0x57f287,
  ERROR = 0xed4245,
  INFO = 0x5865f2
}

export interface DiscordEmbed {
  title: string;
  description: string;
  footer?: {
    text: string;
  };
  color?: number;
}

export interface UserRegistrationEvent {
  userName: string;
  userEmail: string;
  timestamp: string;
}

export interface PasswordChangeEvent {
  userEmail: string;
  timestamp: string;
}

export interface PasswordResetEvent {
  userEmail: string;
  timestamp: string;
}

export interface PasswordResetRequestEvent {
  userEmail: string;
  timestamp: string;
}

export interface PurchaseEvent {
  customerEmail: string;
  plan: string;
  paymentGateway: string;
  timestamp: string;
}

export interface CheckoutSessionCreationEvent {
  customerEmail: string;
  plan: string;
  paymentGateway: string;
  timestamp: string;
}
