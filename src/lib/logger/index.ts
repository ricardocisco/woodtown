import {
  DiscordEmbed,
  EmbedColors,
  CheckoutSessionCreationEvent,
  PasswordChangeEvent,
  PasswordResetEvent,
  PasswordResetRequestEvent,
  PurchaseEvent
} from "@/src/lib/types/logging";

interface LoggerConstructor {
  passwordChangeWebhookUrl: string;
  passwordResetWebhookUrl: string;
  purchaseWebhookUrl: string;
  checkoutSessionWebhookUrl: string;
}

class Logger {
  private passwordChangeWebhookUrl: string;
  private passwordResetWebhookUrl: string;
  private purchaseWebhookUrl: string;
  private isLoggingEnabled: boolean = process.env.IS_LOGGING_ENABLED === "true";
  private checkoutSessionWebhookUrl: string;

  constructor(params: LoggerConstructor) {
    this.passwordChangeWebhookUrl = params.passwordChangeWebhookUrl;
    this.passwordResetWebhookUrl = params.passwordResetWebhookUrl;
    this.purchaseWebhookUrl = params.purchaseWebhookUrl;
    this.checkoutSessionWebhookUrl = params.checkoutSessionWebhookUrl;
  }

  private formatTimestamp(timestamp: string | Date): string {
    try {
      const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
      return date.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
    } catch {
      return timestamp.toString();
    }
  }

  async logPasswordChange(event: PasswordChangeEvent) {
    if (!this.isLoggingEnabled) return;

    const embed: DiscordEmbed = {
      title: "An user has changed their password",
      description: `User with email ${event.userEmail} has changed their password.`,
      footer: {
        text: `Timestamp: ${event.timestamp}`
      },
      color: EmbedColors.SUCCESS
    };

    await fetch(`${this.passwordChangeWebhookUrl}?wait=true`, {
      method: "POST",
      body: JSON.stringify({ embeds: [embed] }),
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  async logPasswordReset(event: PasswordResetEvent) {
    if (!this.isLoggingEnabled) return;

    const embed: DiscordEmbed = {
      title: "An user has reset their password",
      description: `User with email ${event.userEmail} has reset their password.`,
      footer: {
        text: `Data: ${event.timestamp}`
      },
      color: EmbedColors.SUCCESS
    };

    await fetch(`${this.passwordResetWebhookUrl}?wait=true`, {
      method: "POST",
      body: JSON.stringify({ embeds: [embed] }),
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  async logPasswordResetRequest(event: PasswordResetRequestEvent) {
    if (!this.isLoggingEnabled) return;

    const embed: DiscordEmbed = {
      title: "A user has requested a password reset",
      description: `User with email ${event.userEmail} has requested a password reset. An e-mail was sent to them containing the password reset link.`,
      footer: {
        text: `Data: ${event.timestamp}`
      },
      color: EmbedColors.SUCCESS
    };

    await fetch(`${this.passwordResetWebhookUrl}?wait=true`, {
      method: "POST",
      body: JSON.stringify({ embeds: [embed] }),
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  async logPurchase(event: PurchaseEvent) {
    if (!this.isLoggingEnabled) return;

    const embed: DiscordEmbed = {
      title: "um usuário realizou uma compra",
      description: `Usuario com email ${event.customerEmail} realizou uma compra ${event.plan}\nGateway de Pagamento: ${event.paymentGateway}`,
      footer: {
        text: `Data: ${this.formatTimestamp(event.timestamp)}`
      },
      color: EmbedColors.SUCCESS
    };

    await fetch(`${this.purchaseWebhookUrl}?wait=true`, {
      method: "POST",
      body: JSON.stringify({ embeds: [embed] }),
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  async logCheckoutSessionCreation(event: CheckoutSessionCreationEvent) {
    if (!this.isLoggingEnabled) return;

    const embed: DiscordEmbed = {
      title: "Uma sessação de checkout foi criada",
      description: `Usuario com email ${event.customerEmail} criou uma sessão com ${event.plan}\nGateway de Pagamento: ${event.paymentGateway}`,
      footer: {
        text: `Data: ${this.formatTimestamp(event.timestamp)}`
      },
      color: EmbedColors.SUCCESS
    };

    await fetch(`${this.checkoutSessionWebhookUrl}?wait=true`, {
      method: "POST",
      body: JSON.stringify({ embeds: [embed] }),
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}

export const logger = new Logger({
  passwordChangeWebhookUrl: process.env.PASSWORD_CHANGE_WEBHOOK_URL,
  passwordResetWebhookUrl: process.env.PASSWORD_RESET_WEBHOOK_URL,
  purchaseWebhookUrl: process.env.PURCHASE_WEBHOOK_URL,
  checkoutSessionWebhookUrl: process.env.CHECKOUT_SESSION_WEBHOOK_URL
});
