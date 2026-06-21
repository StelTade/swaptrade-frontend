import { Stripe } from './stripe.core.js';
import { StripeConfig } from './lib.js';
type StripeCallableConstructor = typeof Stripe & {
    (key: string, config?: StripeConfig): Stripe;
};
declare const StripeConstructor: StripeCallableConstructor;
interface StripeConstructor extends Stripe {
}
declare namespace StripeConstructor {
    type Stripe = import('./stripe.core.js').Stripe;
    type Account = Stripe.Account;
    type DeletedAccount = Stripe.DeletedAccount;
    type AccountCreateParams = Stripe.AccountCreateParams;
    type AccountRetrieveParams = Stripe.AccountRetrieveParams;
    type AccountUpdateParams = Stripe.AccountUpdateParams;
    type AccountListParams = Stripe.AccountListParams;
    type AccountDeleteParams = Stripe.AccountDeleteParams;
    type AccountCreateExternalAccountParams = Stripe.AccountCreateExternalAccountParams;
    type AccountCreateLoginLinkParams = Stripe.AccountCreateLoginLinkParams;
    type AccountCreatePersonParams = Stripe.AccountCreatePersonParams;
    type AccountDeleteExternalAccountParams = Stripe.AccountDeleteExternalAccountParams;
    type AccountDeletePersonParams = Stripe.AccountDeletePersonParams;
    type AccountListCapabilitiesParams = Stripe.AccountListCapabilitiesParams;
    type AccountListExternalAccountsParams = Stripe.AccountListExternalAccountsParams;
    type AccountListPersonsParams = Stripe.AccountListPersonsParams;
    type AccountRejectParams = Stripe.AccountRejectParams;
    type AccountRetrieveCurrentParams = Stripe.AccountRetrieveCurrentParams;
    type AccountRetrieveCapabilityParams = Stripe.AccountRetrieveCapabilityParams;
    type AccountRetrieveExternalAccountParams = Stripe.AccountRetrieveExternalAccountParams;
    type AccountRetrievePersonParams = Stripe.AccountRetrievePersonParams;
    type AccountUpdateCapabilityParams = Stripe.AccountUpdateCapabilityParams;
    type AccountUpdateExternalAccountParams = Stripe.AccountUpdateExternalAccountParams;
    type AccountUpdatePersonParams = Stripe.AccountUpdatePersonParams;
    type AccountResource = Stripe.AccountResource;
    type AccountLink = Stripe.AccountLink;
    type AccountLinkCreateParams = Stripe.AccountLinkCreateParams;
    type AccountLinkResource = Stripe.AccountLinkResource;
    type AccountSession = Stripe.AccountSession;
    type AccountSessionCreateParams = Stripe.AccountSessionCreateParams;
    type AccountSessionResource = Stripe.AccountSessionResource;
    type ApplePayDomain = Stripe.ApplePayDomain;
    type DeletedApplePayDomain = Stripe.DeletedApplePayDomain;
    type ApplePayDomainCreateParams = Stripe.ApplePayDomainCreateParams;
    type ApplePayDomainRetrieveParams = Stripe.ApplePayDomainRetrieveParams;
    type ApplePayDomainListParams = Stripe.ApplePayDomainListParams;
    type ApplePayDomainDeleteParams = Stripe.ApplePayDomainDeleteParams;
    type ApplePayDomainResource = Stripe.ApplePayDomainResource;
    type ApplicationFee = Stripe.ApplicationFee;
    type ApplicationFeeRetrieveParams = Stripe.ApplicationFeeRetrieveParams;
    type ApplicationFeeListParams = Stripe.ApplicationFeeListParams;
    type ApplicationFeeCreateRefundParams = Stripe.ApplicationFeeCreateRefundParams;
    type ApplicationFeeListRefundsParams = Stripe.ApplicationFeeListRefundsParams;
    type ApplicationFeeRetrieveRefundParams = Stripe.ApplicationFeeRetrieveRefundParams;
    type ApplicationFeeUpdateRefundParams = Stripe.ApplicationFeeUpdateRefundParams;
    type ApplicationFeeResource = Stripe.ApplicationFeeResource;
    type Balance = Stripe.Balance;
    type BalanceRetrieveParams = Stripe.BalanceRetrieveParams;
    type BalanceResource = Stripe.BalanceResource;
    type BalanceSettings = Stripe.BalanceSettings;
    type BalanceSettingsRetrieveParams = Stripe.BalanceSettingsRetrieveParams;
    type BalanceSettingsUpdateParams = Stripe.BalanceSettingsUpdateParams;
    type BalanceSettingResource = Stripe.BalanceSettingResource;
    type BalanceTransaction = Stripe.BalanceTransaction;
    type BalanceTransactionRetrieveParams = Stripe.BalanceTransactionRetrieveParams;
    type BalanceTransactionListParams = Stripe.BalanceTransactionListParams;
    type BalanceTransactionResource = Stripe.BalanceTransactionResource;
    type Charge = Stripe.Charge;
    type ChargeCreateParams = Stripe.ChargeCreateParams;
    type ChargeRetrieveParams = Stripe.ChargeRetrieveParams;
    type ChargeUpdateParams = Stripe.ChargeUpdateParams;
    type ChargeListParams = Stripe.ChargeListParams;
    type ChargeCaptureParams = Stripe.ChargeCaptureParams;
    type ChargeSearchParams = Stripe.ChargeSearchParams;
    type ChargeResource = Stripe.ChargeResource;
    type ConfirmationToken = Stripe.ConfirmationToken;
    type ConfirmationTokenRetrieveParams = Stripe.ConfirmationTokenRetrieveParams;
    type ConfirmationTokenResource = Stripe.ConfirmationTokenResource;
    type CountrySpec = Stripe.CountrySpec;
    type CountrySpecRetrieveParams = Stripe.CountrySpecRetrieveParams;
    type CountrySpecListParams = Stripe.CountrySpecListParams;
    type CountrySpecResource = Stripe.CountrySpecResource;
    type Coupon = Stripe.Coupon;
    type DeletedCoupon = Stripe.DeletedCoupon;
    type CouponCreateParams = Stripe.CouponCreateParams;
    type CouponRetrieveParams = Stripe.CouponRetrieveParams;
    type CouponUpdateParams = Stripe.CouponUpdateParams;
    type CouponListParams = Stripe.CouponListParams;
    type CouponDeleteParams = Stripe.CouponDeleteParams;
    type CouponResource = Stripe.CouponResource;
    type CreditNote = Stripe.CreditNote;
    type CreditNoteCreateParams = Stripe.CreditNoteCreateParams;
    type CreditNoteRetrieveParams = Stripe.CreditNoteRetrieveParams;
    type CreditNoteUpdateParams = Stripe.CreditNoteUpdateParams;
    type CreditNoteListParams = Stripe.CreditNoteListParams;
    type CreditNoteListLineItemsParams = Stripe.CreditNoteListLineItemsParams;
    type CreditNoteListPreviewLineItemsParams = Stripe.CreditNoteListPreviewLineItemsParams;
    type CreditNotePreviewParams = Stripe.CreditNotePreviewParams;
    type CreditNoteVoidCreditNoteParams = Stripe.CreditNoteVoidCreditNoteParams;
    type CreditNoteResource = Stripe.CreditNoteResource;
    type Customer = Stripe.Customer;
    type DeletedCustomer = Stripe.DeletedCustomer;
    type CustomerCreateParams = Stripe.CustomerCreateParams;
    type CustomerRetrieveParams = Stripe.CustomerRetrieveParams;
    type CustomerUpdateParams = Stripe.CustomerUpdateParams;
    type CustomerListParams = Stripe.CustomerListParams;
    type CustomerDeleteParams = Stripe.CustomerDeleteParams;
    type CustomerCreateBalanceTransactionParams = Stripe.CustomerCreateBalanceTransactionParams;
    type CustomerCreateFundingInstructionsParams = Stripe.CustomerCreateFundingInstructionsParams;
    type CustomerCreateSourceParams = Stripe.CustomerCreateSourceParams;
    type CustomerCreateTaxIdParams = Stripe.CustomerCreateTaxIdParams;
    type CustomerDeleteDiscountParams = Stripe.CustomerDeleteDiscountParams;
    type CustomerDeleteSourceParams = Stripe.CustomerDeleteSourceParams;
    type CustomerDeleteTaxIdParams = Stripe.CustomerDeleteTaxIdParams;
    type CustomerListBalanceTransactionsParams = Stripe.CustomerListBalanceTransactionsParams;
    type CustomerListCashBalanceTransactionsParams = Stripe.CustomerListCashBalanceTransactionsParams;
    type CustomerListPaymentMethodsParams = Stripe.CustomerListPaymentMethodsParams;
    type CustomerListSourcesParams = Stripe.CustomerListSourcesParams;
    type CustomerListTaxIdsParams = Stripe.CustomerListTaxIdsParams;
    type CustomerRetrieveBalanceTransactionParams = Stripe.CustomerRetrieveBalanceTransactionParams;
    type CustomerRetrieveCashBalanceParams = Stripe.CustomerRetrieveCashBalanceParams;
    type CustomerRetrieveCashBalanceTransactionParams = Stripe.CustomerRetrieveCashBalanceTransactionParams;
    type CustomerRetrievePaymentMethodParams = Stripe.CustomerRetrievePaymentMethodParams;
    type CustomerRetrieveSourceParams = Stripe.CustomerRetrieveSourceParams;
    type CustomerRetrieveTaxIdParams = Stripe.CustomerRetrieveTaxIdParams;
    type CustomerSearchParams = Stripe.CustomerSearchParams;
    type CustomerUpdateBalanceTransactionParams = Stripe.CustomerUpdateBalanceTransactionParams;
    type CustomerUpdateCashBalanceParams = Stripe.CustomerUpdateCashBalanceParams;
    type CustomerUpdateSourceParams = Stripe.CustomerUpdateSourceParams;
    type CustomerVerifySourceParams = Stripe.CustomerVerifySourceParams;
    type CustomerResource = Stripe.CustomerResource;
    type CustomerSession = Stripe.CustomerSession;
    type CustomerSessionCreateParams = Stripe.CustomerSessionCreateParams;
    type CustomerSessionResource = Stripe.CustomerSessionResource;
    type Dispute = Stripe.Dispute;
    type DisputeRetrieveParams = Stripe.DisputeRetrieveParams;
    type DisputeUpdateParams = Stripe.DisputeUpdateParams;
    type DisputeListParams = Stripe.DisputeListParams;
    type DisputeCloseParams = Stripe.DisputeCloseParams;
    type DisputeResource = Stripe.DisputeResource;
    type EphemeralKey = Stripe.EphemeralKey;
    type EphemeralKeyCreateParams = Stripe.EphemeralKeyCreateParams;
    type EphemeralKeyDeleteParams = Stripe.EphemeralKeyDeleteParams;
    type EphemeralKeyResource = Stripe.EphemeralKeyResource;
    type Event = Stripe.Event;
    type EventBase = Stripe.EventBase;
    type EventRetrieveParams = Stripe.EventRetrieveParams;
    type EventListParams = Stripe.EventListParams;
    type EventResource = Stripe.EventResource;
    type ExchangeRate = Stripe.ExchangeRate;
    type ExchangeRateRetrieveParams = Stripe.ExchangeRateRetrieveParams;
    type ExchangeRateListParams = Stripe.ExchangeRateListParams;
    type ExchangeRateResource = Stripe.ExchangeRateResource;
    type File = Stripe.File;
    type FileCreateParams = Stripe.FileCreateParams;
    type FileRetrieveParams = Stripe.FileRetrieveParams;
    type FileListParams = Stripe.FileListParams;
    type FileResource = Stripe.FileResource;
    type FileLink = Stripe.FileLink;
    type FileLinkCreateParams = Stripe.FileLinkCreateParams;
    type FileLinkRetrieveParams = Stripe.FileLinkRetrieveParams;
    type FileLinkUpdateParams = Stripe.FileLinkUpdateParams;
    type FileLinkListParams = Stripe.FileLinkListParams;
    type FileLinkResource = Stripe.FileLinkResource;
    type Invoice = Stripe.Invoice;
    type DeletedInvoice = Stripe.DeletedInvoice;
    type InvoiceCreateParams = Stripe.InvoiceCreateParams;
    type InvoiceRetrieveParams = Stripe.InvoiceRetrieveParams;
    type InvoiceUpdateParams = Stripe.InvoiceUpdateParams;
    type InvoiceListParams = Stripe.InvoiceListParams;
    type InvoiceDeleteParams = Stripe.InvoiceDeleteParams;
    type InvoiceAddLinesParams = Stripe.InvoiceAddLinesParams;
    type InvoiceAttachPaymentParams = Stripe.InvoiceAttachPaymentParams;
    type InvoiceCreatePreviewParams = Stripe.InvoiceCreatePreviewParams;
    type InvoiceFinalizeInvoiceParams = Stripe.InvoiceFinalizeInvoiceParams;
    type InvoiceListLineItemsParams = Stripe.InvoiceListLineItemsParams;
    type InvoiceMarkUncollectibleParams = Stripe.InvoiceMarkUncollectibleParams;
    type InvoicePayParams = Stripe.InvoicePayParams;
    type InvoiceRemoveLinesParams = Stripe.InvoiceRemoveLinesParams;
    type InvoiceSearchParams = Stripe.InvoiceSearchParams;
    type InvoiceSendInvoiceParams = Stripe.InvoiceSendInvoiceParams;
    type InvoiceUpdateLinesParams = Stripe.InvoiceUpdateLinesParams;
    type InvoiceUpdateLineItemParams = Stripe.InvoiceUpdateLineItemParams;
    type InvoiceVoidInvoiceParams = Stripe.InvoiceVoidInvoiceParams;
    type InvoiceResource = Stripe.InvoiceResource;
    type InvoiceItem = Stripe.InvoiceItem;
    type DeletedInvoiceItem = Stripe.DeletedInvoiceItem;
    type InvoiceItemCreateParams = Stripe.InvoiceItemCreateParams;
    type InvoiceItemRetrieveParams = Stripe.InvoiceItemRetrieveParams;
    type InvoiceItemUpdateParams = Stripe.InvoiceItemUpdateParams;
    type InvoiceItemListParams = Stripe.InvoiceItemListParams;
    type InvoiceItemDeleteParams = Stripe.InvoiceItemDeleteParams;
    type InvoiceItemResource = Stripe.InvoiceItemResource;
    type InvoicePayment = Stripe.InvoicePayment;
    type InvoicePaymentRetrieveParams = Stripe.InvoicePaymentRetrieveParams;
    type InvoicePaymentListParams = Stripe.InvoicePaymentListParams;
    type InvoicePaymentResource = Stripe.InvoicePaymentResource;
    type InvoiceRenderingTemplate = Stripe.InvoiceRenderingTemplate;
    type InvoiceRenderingTemplateRetrieveParams = Stripe.InvoiceRenderingTemplateRetrieveParams;
    type InvoiceRenderingTemplateListParams = Stripe.InvoiceRenderingTemplateListParams;
    type InvoiceRenderingTemplateArchiveParams = Stripe.InvoiceRenderingTemplateArchiveParams;
    type InvoiceRenderingTemplateUnarchiveParams = Stripe.InvoiceRenderingTemplateUnarchiveParams;
    type InvoiceRenderingTemplateResource = Stripe.InvoiceRenderingTemplateResource;
    type Mandate = Stripe.Mandate;
    type MandateRetrieveParams = Stripe.MandateRetrieveParams;
    type MandateResource = Stripe.MandateResource;
    type PaymentAttemptRecord = Stripe.PaymentAttemptRecord;
    type PaymentAttemptRecordRetrieveParams = Stripe.PaymentAttemptRecordRetrieveParams;
    type PaymentAttemptRecordListParams = Stripe.PaymentAttemptRecordListParams;
    type PaymentAttemptRecordResource = Stripe.PaymentAttemptRecordResource;
    type PaymentIntent = Stripe.PaymentIntent;
    type PaymentIntentCreateParams = Stripe.PaymentIntentCreateParams;
    type PaymentIntentRetrieveParams = Stripe.PaymentIntentRetrieveParams;
    type PaymentIntentUpdateParams = Stripe.PaymentIntentUpdateParams;
    type PaymentIntentListParams = Stripe.PaymentIntentListParams;
    type PaymentIntentApplyCustomerBalanceParams = Stripe.PaymentIntentApplyCustomerBalanceParams;
    type PaymentIntentCancelParams = Stripe.PaymentIntentCancelParams;
    type PaymentIntentCaptureParams = Stripe.PaymentIntentCaptureParams;
    type PaymentIntentConfirmParams = Stripe.PaymentIntentConfirmParams;
    type PaymentIntentIncrementAuthorizationParams = Stripe.PaymentIntentIncrementAuthorizationParams;
    type PaymentIntentListAmountDetailsLineItemsParams = Stripe.PaymentIntentListAmountDetailsLineItemsParams;
    type PaymentIntentSearchParams = Stripe.PaymentIntentSearchParams;
    type PaymentIntentVerifyMicrodepositsParams = Stripe.PaymentIntentVerifyMicrodepositsParams;
    type PaymentIntentResource = Stripe.PaymentIntentResource;
    type PaymentLink = Stripe.PaymentLink;
    type PaymentLinkCreateParams = Stripe.PaymentLinkCreateParams;
    type PaymentLinkRetrieveParams = Stripe.PaymentLinkRetrieveParams;
    type PaymentLinkUpdateParams = Stripe.PaymentLinkUpdateParams;
    type PaymentLinkListParams = Stripe.PaymentLinkListParams;
    type PaymentLinkListLineItemsParams = Stripe.PaymentLinkListLineItemsParams;
    type PaymentLinkResource = Stripe.PaymentLinkResource;
    type PaymentMethod = Stripe.PaymentMethod;
    type PaymentMethodCreateParams = Stripe.PaymentMethodCreateParams;
    type PaymentMethodRetrieveParams = Stripe.PaymentMethodRetrieveParams;
    type PaymentMethodUpdateParams = Stripe.PaymentMethodUpdateParams;
    type PaymentMethodListParams = Stripe.PaymentMethodListParams;
    type PaymentMethodAttachParams = Stripe.PaymentMethodAttachParams;
    type PaymentMethodDetachParams = Stripe.PaymentMethodDetachParams;
    type PaymentMethodResource = Stripe.PaymentMethodResource;
    type PaymentMethodConfiguration = Stripe.PaymentMethodConfiguration;
    type PaymentMethodConfigurationCreateParams = Stripe.PaymentMethodConfigurationCreateParams;
    type PaymentMethodConfigurationRetrieveParams = Stripe.PaymentMethodConfigurationRetrieveParams;
    type PaymentMethodConfigurationUpdateParams = Stripe.PaymentMethodConfigurationUpdateParams;
    type PaymentMethodConfigurationListParams = Stripe.PaymentMethodConfigurationListParams;
    type PaymentMethodConfigurationResource = Stripe.PaymentMethodConfigurationResource;
    type PaymentMethodDomain = Stripe.PaymentMethodDomain;
    type PaymentMethodDomainCreateParams = Stripe.PaymentMethodDomainCreateParams;
    type PaymentMethodDomainRetrieveParams = Stripe.PaymentMethodDomainRetrieveParams;
    type PaymentMethodDomainUpdateParams = Stripe.PaymentMethodDomainUpdateParams;
    type PaymentMethodDomainListParams = Stripe.PaymentMethodDomainListParams;
    type PaymentMethodDomainValidateParams = Stripe.PaymentMethodDomainValidateParams;
    type PaymentMethodDomainResource = Stripe.PaymentMethodDomainResource;
    type PaymentRecord = Stripe.PaymentRecord;
    type PaymentRecordRetrieveParams = Stripe.PaymentRecordRetrieveParams;
    type PaymentRecordReportPaymentParams = Stripe.PaymentRecordReportPaymentParams;
    type PaymentRecordReportPaymentAttemptParams = Stripe.PaymentRecordReportPaymentAttemptParams;
    type PaymentRecordReportPaymentAttemptCanceledParams = Stripe.PaymentRecordReportPaymentAttemptCanceledParams;
    type PaymentRecordReportPaymentAttemptFailedParams = Stripe.PaymentRecordReportPaymentAttemptFailedParams;
    type PaymentRecordReportPaymentAttemptGuaranteedParams = Stripe.PaymentRecordReportPaymentAttemptGuaranteedParams;
    type PaymentRecordReportPaymentAttemptInformationalParams = Stripe.PaymentRecordReportPaymentAttemptInformationalParams;
    type PaymentRecordReportRefundParams = Stripe.PaymentRecordReportRefundParams;
    type PaymentRecordResource = Stripe.PaymentRecordResource;
    type Payout = Stripe.Payout;
    type PayoutCreateParams = Stripe.PayoutCreateParams;
    type PayoutRetrieveParams = Stripe.PayoutRetrieveParams;
    type PayoutUpdateParams = Stripe.PayoutUpdateParams;
    type PayoutListParams = Stripe.PayoutListParams;
    type PayoutCancelParams = Stripe.PayoutCancelParams;
    type PayoutReverseParams = Stripe.PayoutReverseParams;
    type PayoutResource = Stripe.PayoutResource;
    type Plan = Stripe.Plan;
    type DeletedPlan = Stripe.DeletedPlan;
    type PlanCreateParams = Stripe.PlanCreateParams;
    type PlanRetrieveParams = Stripe.PlanRetrieveParams;
    type PlanUpdateParams = Stripe.PlanUpdateParams;
    type PlanListParams = Stripe.PlanListParams;
    type PlanDeleteParams = Stripe.PlanDeleteParams;
    type PlanResource = Stripe.PlanResource;
    type Price = Stripe.Price;
    type DeletedPrice = Stripe.DeletedPrice;
    type PriceCreateParams = Stripe.PriceCreateParams;
    type PriceRetrieveParams = Stripe.PriceRetrieveParams;
    type PriceUpdateParams = Stripe.PriceUpdateParams;
    type PriceListParams = Stripe.PriceListParams;
    type PriceSearchParams = Stripe.PriceSearchParams;
    type PriceResource = Stripe.PriceResource;
    type Product = Stripe.Product;
    type DeletedProduct = Stripe.DeletedProduct;
    type ProductCreateParams = Stripe.ProductCreateParams;
    type ProductRetrieveParams = Stripe.ProductRetrieveParams;
    type ProductUpdateParams = Stripe.ProductUpdateParams;
    type ProductListParams = Stripe.ProductListParams;
    type ProductDeleteParams = Stripe.ProductDeleteParams;
    type ProductCreateFeatureParams = Stripe.ProductCreateFeatureParams;
    type ProductDeleteFeatureParams = Stripe.ProductDeleteFeatureParams;
    type ProductListFeaturesParams = Stripe.ProductListFeaturesParams;
    type ProductRetrieveFeatureParams = Stripe.ProductRetrieveFeatureParams;
    type ProductSearchParams = Stripe.ProductSearchParams;
    type ProductResource = Stripe.ProductResource;
    type PromotionCode = Stripe.PromotionCode;
    type PromotionCodeCreateParams = Stripe.PromotionCodeCreateParams;
    type PromotionCodeRetrieveParams = Stripe.PromotionCodeRetrieveParams;
    type PromotionCodeUpdateParams = Stripe.PromotionCodeUpdateParams;
    type PromotionCodeListParams = Stripe.PromotionCodeListParams;
    type PromotionCodeResource = Stripe.PromotionCodeResource;
    type Quote = Stripe.Quote;
    type QuoteCreateParams = Stripe.QuoteCreateParams;
    type QuoteRetrieveParams = Stripe.QuoteRetrieveParams;
    type QuoteUpdateParams = Stripe.QuoteUpdateParams;
    type QuoteListParams = Stripe.QuoteListParams;
    type QuoteAcceptParams = Stripe.QuoteAcceptParams;
    type QuoteCancelParams = Stripe.QuoteCancelParams;
    type QuoteFinalizeQuoteParams = Stripe.QuoteFinalizeQuoteParams;
    type QuoteListComputedUpfrontLineItemsParams = Stripe.QuoteListComputedUpfrontLineItemsParams;
    type QuoteListLineItemsParams = Stripe.QuoteListLineItemsParams;
    type QuotePdfParams = Stripe.QuotePdfParams;
    type QuoteResource = Stripe.QuoteResource;
    type Refund = Stripe.Refund;
    type RefundCreateParams = Stripe.RefundCreateParams;
    type RefundRetrieveParams = Stripe.RefundRetrieveParams;
    type RefundUpdateParams = Stripe.RefundUpdateParams;
    type RefundListParams = Stripe.RefundListParams;
    type RefundCancelParams = Stripe.RefundCancelParams;
    type RefundResource = Stripe.RefundResource;
    type Review = Stripe.Review;
    type ReviewRetrieveParams = Stripe.ReviewRetrieveParams;
    type ReviewListParams = Stripe.ReviewListParams;
    type ReviewApproveParams = Stripe.ReviewApproveParams;
    type ReviewResource = Stripe.ReviewResource;
    type SetupAttempt = Stripe.SetupAttempt;
    type SetupAttemptListParams = Stripe.SetupAttemptListParams;
    type SetupAttemptResource = Stripe.SetupAttemptResource;
    type SetupIntent = Stripe.SetupIntent;
    type SetupIntentCreateParams = Stripe.SetupIntentCreateParams;
    type SetupIntentRetrieveParams = Stripe.SetupIntentRetrieveParams;
    type SetupIntentUpdateParams = Stripe.SetupIntentUpdateParams;
    type SetupIntentListParams = Stripe.SetupIntentListParams;
    type SetupIntentCancelParams = Stripe.SetupIntentCancelParams;
    type SetupIntentConfirmParams = Stripe.SetupIntentConfirmParams;
    type SetupIntentVerifyMicrodepositsParams = Stripe.SetupIntentVerifyMicrodepositsParams;
    type SetupIntentResource = Stripe.SetupIntentResource;
    type ShippingRate = Stripe.ShippingRate;
    type ShippingRateCreateParams = Stripe.ShippingRateCreateParams;
    type ShippingRateRetrieveParams = Stripe.ShippingRateRetrieveParams;
    type ShippingRateUpdateParams = Stripe.ShippingRateUpdateParams;
    type ShippingRateListParams = Stripe.ShippingRateListParams;
    type ShippingRateResource = Stripe.ShippingRateResource;
    type Source = Stripe.Source;
    type SourceCreateParams = Stripe.SourceCreateParams;
    type SourceRetrieveParams = Stripe.SourceRetrieveParams;
    type SourceUpdateParams = Stripe.SourceUpdateParams;
    type SourceListSourceTransactionsParams = Stripe.SourceListSourceTransactionsParams;
    type SourceVerifyParams = Stripe.SourceVerifyParams;
    type SourceResource = Stripe.SourceResource;
    type Subscription = Stripe.Subscription;
    type SubscriptionCreateParams = Stripe.SubscriptionCreateParams;
    type SubscriptionRetrieveParams = Stripe.SubscriptionRetrieveParams;
    type SubscriptionUpdateParams = Stripe.SubscriptionUpdateParams;
    type SubscriptionListParams = Stripe.SubscriptionListParams;
    type SubscriptionCancelParams = Stripe.SubscriptionCancelParams;
    type SubscriptionDeleteDiscountParams = Stripe.SubscriptionDeleteDiscountParams;
    type SubscriptionMigrateParams = Stripe.SubscriptionMigrateParams;
    type SubscriptionResumeParams = Stripe.SubscriptionResumeParams;
    type SubscriptionSearchParams = Stripe.SubscriptionSearchParams;
    type SubscriptionResource = Stripe.SubscriptionResource;
    type SubscriptionItem = Stripe.SubscriptionItem;
    type DeletedSubscriptionItem = Stripe.DeletedSubscriptionItem;
    type SubscriptionItemCreateParams = Stripe.SubscriptionItemCreateParams;
    type SubscriptionItemRetrieveParams = Stripe.SubscriptionItemRetrieveParams;
    type SubscriptionItemUpdateParams = Stripe.SubscriptionItemUpdateParams;
    type SubscriptionItemListParams = Stripe.SubscriptionItemListParams;
    type SubscriptionItemDeleteParams = Stripe.SubscriptionItemDeleteParams;
    type SubscriptionItemResource = Stripe.SubscriptionItemResource;
    type SubscriptionSchedule = Stripe.SubscriptionSchedule;
    type SubscriptionScheduleCreateParams = Stripe.SubscriptionScheduleCreateParams;
    type SubscriptionScheduleRetrieveParams = Stripe.SubscriptionScheduleRetrieveParams;
    type SubscriptionScheduleUpdateParams = Stripe.SubscriptionScheduleUpdateParams;
    type SubscriptionScheduleListParams = Stripe.SubscriptionScheduleListParams;
    type SubscriptionScheduleCancelParams = Stripe.SubscriptionScheduleCancelParams;
    type SubscriptionScheduleReleaseParams = Stripe.SubscriptionScheduleReleaseParams;
    type SubscriptionScheduleResource = Stripe.SubscriptionScheduleResource;
    type TaxCode = Stripe.TaxCode;
    type TaxCodeRetrieveParams = Stripe.TaxCodeRetrieveParams;
    type TaxCodeListParams = Stripe.TaxCodeListParams;
    type TaxCodeResource = Stripe.TaxCodeResource;
    type TaxId = Stripe.TaxId;
    type DeletedTaxId = Stripe.DeletedTaxId;
    type TaxIdCreateParams = Stripe.TaxIdCreateParams;
    type TaxIdRetrieveParams = Stripe.TaxIdRetrieveParams;
    type TaxIdListParams = Stripe.TaxIdListParams;
    type TaxIdDeleteParams = Stripe.TaxIdDeleteParams;
    type TaxIdResource = Stripe.TaxIdResource;
    type TaxRate = Stripe.TaxRate;
    type TaxRateCreateParams = Stripe.TaxRateCreateParams;
    type TaxRateRetrieveParams = Stripe.TaxRateRetrieveParams;
    type TaxRateUpdateParams = Stripe.TaxRateUpdateParams;
    type TaxRateListParams = Stripe.TaxRateListParams;
    type TaxRateResource = Stripe.TaxRateResource;
    type Token = Stripe.Token;
    type TokenCreateParams = Stripe.TokenCreateParams;
    type TokenRetrieveParams = Stripe.TokenRetrieveParams;
    type TokenResource = Stripe.TokenResource;
    type Topup = Stripe.Topup;
    type TopupCreateParams = Stripe.TopupCreateParams;
    type TopupRetrieveParams = Stripe.TopupRetrieveParams;
    type TopupUpdateParams = Stripe.TopupUpdateParams;
    type TopupListParams = Stripe.TopupListParams;
    type TopupCancelParams = Stripe.TopupCancelParams;
    type TopupResource = Stripe.TopupResource;
    type Transfer = Stripe.Transfer;
    type TransferCreateParams = Stripe.TransferCreateParams;
    type TransferRetrieveParams = Stripe.TransferRetrieveParams;
    type TransferUpdateParams = Stripe.TransferUpdateParams;
    type TransferListParams = Stripe.TransferListParams;
    type TransferCreateReversalParams = Stripe.TransferCreateReversalParams;
    type TransferListReversalsParams = Stripe.TransferListReversalsParams;
    type TransferRetrieveReversalParams = Stripe.TransferRetrieveReversalParams;
    type TransferUpdateReversalParams = Stripe.TransferUpdateReversalParams;
    type TransferResource = Stripe.TransferResource;
    type WebhookEndpoint = Stripe.WebhookEndpoint;
    type DeletedWebhookEndpoint = Stripe.DeletedWebhookEndpoint;
    type WebhookEndpointCreateParams = Stripe.WebhookEndpointCreateParams;
    type WebhookEndpointRetrieveParams = Stripe.WebhookEndpointRetrieveParams;
    type WebhookEndpointUpdateParams = Stripe.WebhookEndpointUpdateParams;
    type WebhookEndpointListParams = Stripe.WebhookEndpointListParams;
    type WebhookEndpointDeleteParams = Stripe.WebhookEndpointDeleteParams;
    type WebhookEndpointResource = Stripe.WebhookEndpointResource;
    type Application = Stripe.Application;
    type DeletedApplication = Stripe.DeletedApplication;
    type BalanceTransactionSource = Stripe.BalanceTransactionSource;
    type BankAccount = Stripe.BankAccount;
    type DeletedBankAccount = Stripe.DeletedBankAccount;
    type Card = Stripe.Card;
    type DeletedCard = Stripe.DeletedCard;
    type ConnectCollectionTransfer = Stripe.ConnectCollectionTransfer;
    type Discount = Stripe.Discount;
    type DeletedDiscount = Stripe.DeletedDiscount;
    type FundingInstructions = Stripe.FundingInstructions;
    type LineItem = Stripe.LineItem;
    type ReserveTransaction = Stripe.ReserveTransaction;
    type SourceMandateNotification = Stripe.SourceMandateNotification;
    type SourceTransaction = Stripe.SourceTransaction;
    type TaxDeductedAtSource = Stripe.TaxDeductedAtSource;
    type Capability = Stripe.Capability;
    type ExternalAccount = Stripe.ExternalAccount;
    type DeletedExternalAccount = Stripe.DeletedExternalAccount;
    type LoginLink = Stripe.LoginLink;
    type Person = Stripe.Person;
    type DeletedPerson = Stripe.DeletedPerson;
    type FeeRefund = Stripe.FeeRefund;
    type CreditNoteLineItem = Stripe.CreditNoteLineItem;
    type CustomerBalanceTransaction = Stripe.CustomerBalanceTransaction;
    type CashBalance = Stripe.CashBalance;
    type CustomerCashBalanceTransaction = Stripe.CustomerCashBalanceTransaction;
    type CustomerSource = Stripe.CustomerSource;
    type DeletedCustomerSource = Stripe.DeletedCustomerSource;
    type InvoiceLineItem = Stripe.InvoiceLineItem;
    type PaymentIntentAmountDetailsLineItem = Stripe.PaymentIntentAmountDetailsLineItem;
    type ProductFeature = Stripe.ProductFeature;
    type DeletedProductFeature = Stripe.DeletedProductFeature;
    type TransferReversal = Stripe.TransferReversal;
    namespace AccountCreateParams {
        type BusinessProfile = Stripe.AccountCreateParams.BusinessProfile;
        type BusinessType = Stripe.AccountCreateParams.BusinessType;
        type Capabilities = Stripe.AccountCreateParams.Capabilities;
        type Company = Stripe.AccountCreateParams.Company;
        type Controller = Stripe.AccountCreateParams.Controller;
        type Documents = Stripe.AccountCreateParams.Documents;
        type ExternalAccount = Stripe.AccountCreateParams.ExternalAccount;
        type Groups = Stripe.AccountCreateParams.Groups;
        type Individual = Stripe.AccountCreateParams.Individual;
        type Settings = Stripe.AccountCreateParams.Settings;
        type TosAcceptance = Stripe.AccountCreateParams.TosAcceptance;
        type Type = Stripe.AccountCreateParams.Type;
    }
    namespace AccountUpdateParams {
        type BusinessProfile = Stripe.AccountUpdateParams.BusinessProfile;
        type BusinessType = Stripe.AccountUpdateParams.BusinessType;
        type Capabilities = Stripe.AccountUpdateParams.Capabilities;
        type Company = Stripe.AccountUpdateParams.Company;
        type Documents = Stripe.AccountUpdateParams.Documents;
        type BankAccount = Stripe.AccountUpdateParams.BankAccount;
        type Card = Stripe.AccountUpdateParams.Card;
        type CardToken = Stripe.AccountUpdateParams.CardToken;
        type Groups = Stripe.AccountUpdateParams.Groups;
        type Individual = Stripe.AccountUpdateParams.Individual;
        type Settings = Stripe.AccountUpdateParams.Settings;
        type TosAcceptance = Stripe.AccountUpdateParams.TosAcceptance;
    }
    namespace AccountCreateExternalAccountParams {
        type Card = Stripe.AccountCreateExternalAccountParams.Card;
        type BankAccount = Stripe.AccountCreateExternalAccountParams.BankAccount;
        type CardToken = Stripe.AccountCreateExternalAccountParams.CardToken;
    }
    namespace AccountCreatePersonParams {
        type AdditionalTosAcceptances = Stripe.AccountCreatePersonParams.AdditionalTosAcceptances;
        type Dob = Stripe.AccountCreatePersonParams.Dob;
        type Documents = Stripe.AccountCreatePersonParams.Documents;
        type PoliticalExposure = Stripe.AccountCreatePersonParams.PoliticalExposure;
        type Relationship = Stripe.AccountCreatePersonParams.Relationship;
        type UsCfpbData = Stripe.AccountCreatePersonParams.UsCfpbData;
        type Verification = Stripe.AccountCreatePersonParams.Verification;
    }
    namespace AccountListExternalAccountsParams {
        type Object = Stripe.AccountListExternalAccountsParams.Object;
    }
    namespace AccountListPersonsParams {
        type Relationship = Stripe.AccountListPersonsParams.Relationship;
    }
    namespace AccountUpdateExternalAccountParams {
        type AccountHolderType = Stripe.AccountUpdateExternalAccountParams.AccountHolderType;
        type AccountType = Stripe.AccountUpdateExternalAccountParams.AccountType;
        type Documents = Stripe.AccountUpdateExternalAccountParams.Documents;
    }
    namespace AccountUpdatePersonParams {
        type AdditionalTosAcceptances = Stripe.AccountUpdatePersonParams.AdditionalTosAcceptances;
        type Dob = Stripe.AccountUpdatePersonParams.Dob;
        type Documents = Stripe.AccountUpdatePersonParams.Documents;
        type PoliticalExposure = Stripe.AccountUpdatePersonParams.PoliticalExposure;
        type Relationship = Stripe.AccountUpdatePersonParams.Relationship;
        type UsCfpbData = Stripe.AccountUpdatePersonParams.UsCfpbData;
        type Verification = Stripe.AccountUpdatePersonParams.Verification;
    }
    namespace AccountLinkCreateParams {
        type Type = Stripe.AccountLinkCreateParams.Type;
        type Collect = Stripe.AccountLinkCreateParams.Collect;
        type CollectionOptions = Stripe.AccountLinkCreateParams.CollectionOptions;
    }
    namespace AccountSessionCreateParams {
        type Components = Stripe.AccountSessionCreateParams.Components;
    }
    namespace BalanceSettingsUpdateParams {
        type Payments = Stripe.BalanceSettingsUpdateParams.Payments;
    }
    namespace ChargeCreateParams {
        type Destination = Stripe.ChargeCreateParams.Destination;
        type RadarOptions = Stripe.ChargeCreateParams.RadarOptions;
        type Shipping = Stripe.ChargeCreateParams.Shipping;
        type TransferData = Stripe.ChargeCreateParams.TransferData;
    }
    namespace ChargeUpdateParams {
        type FraudDetails = Stripe.ChargeUpdateParams.FraudDetails;
        type Shipping = Stripe.ChargeUpdateParams.Shipping;
    }
    namespace ChargeCaptureParams {
        type TransferData = Stripe.ChargeCaptureParams.TransferData;
    }
    namespace CouponCreateParams {
        type AppliesTo = Stripe.CouponCreateParams.AppliesTo;
        type CurrencyOptions = Stripe.CouponCreateParams.CurrencyOptions;
        type Duration = Stripe.CouponCreateParams.Duration;
    }
    namespace CouponUpdateParams {
        type CurrencyOptions = Stripe.CouponUpdateParams.CurrencyOptions;
    }
    namespace CreditNoteCreateParams {
        type EmailType = Stripe.CreditNoteCreateParams.EmailType;
        type Line = Stripe.CreditNoteCreateParams.Line;
        type Reason = Stripe.CreditNoteCreateParams.Reason;
        type Refund = Stripe.CreditNoteCreateParams.Refund;
        type ShippingCost = Stripe.CreditNoteCreateParams.ShippingCost;
    }
    namespace CreditNoteListPreviewLineItemsParams {
        type EmailType = Stripe.CreditNoteListPreviewLineItemsParams.EmailType;
        type Line = Stripe.CreditNoteListPreviewLineItemsParams.Line;
        type Reason = Stripe.CreditNoteListPreviewLineItemsParams.Reason;
        type Refund = Stripe.CreditNoteListPreviewLineItemsParams.Refund;
        type ShippingCost = Stripe.CreditNoteListPreviewLineItemsParams.ShippingCost;
    }
    namespace CreditNotePreviewParams {
        type EmailType = Stripe.CreditNotePreviewParams.EmailType;
        type Line = Stripe.CreditNotePreviewParams.Line;
        type Reason = Stripe.CreditNotePreviewParams.Reason;
        type Refund = Stripe.CreditNotePreviewParams.Refund;
        type ShippingCost = Stripe.CreditNotePreviewParams.ShippingCost;
    }
    namespace CustomerCreateParams {
        type CashBalance = Stripe.CustomerCreateParams.CashBalance;
        type InvoiceSettings = Stripe.CustomerCreateParams.InvoiceSettings;
        type Shipping = Stripe.CustomerCreateParams.Shipping;
        type Tax = Stripe.CustomerCreateParams.Tax;
        type TaxExempt = Stripe.CustomerCreateParams.TaxExempt;
        type TaxIdDatum = Stripe.CustomerCreateParams.TaxIdDatum;
    }
    namespace CustomerUpdateParams {
        type CashBalance = Stripe.CustomerUpdateParams.CashBalance;
        type InvoiceSettings = Stripe.CustomerUpdateParams.InvoiceSettings;
        type Shipping = Stripe.CustomerUpdateParams.Shipping;
        type Tax = Stripe.CustomerUpdateParams.Tax;
        type TaxExempt = Stripe.CustomerUpdateParams.TaxExempt;
    }
    namespace CustomerCreateFundingInstructionsParams {
        type BankTransfer = Stripe.CustomerCreateFundingInstructionsParams.BankTransfer;
    }
    namespace CustomerCreateTaxIdParams {
        type Type = Stripe.CustomerCreateTaxIdParams.Type;
    }
    namespace CustomerListPaymentMethodsParams {
        type AllowRedisplay = Stripe.CustomerListPaymentMethodsParams.AllowRedisplay;
        type Type = Stripe.CustomerListPaymentMethodsParams.Type;
    }
    namespace CustomerUpdateCashBalanceParams {
        type Settings = Stripe.CustomerUpdateCashBalanceParams.Settings;
    }
    namespace CustomerUpdateSourceParams {
        type AccountHolderType = Stripe.CustomerUpdateSourceParams.AccountHolderType;
        type Owner = Stripe.CustomerUpdateSourceParams.Owner;
    }
    namespace CustomerSessionCreateParams {
        type Components = Stripe.CustomerSessionCreateParams.Components;
    }
    namespace DisputeUpdateParams {
        type Evidence = Stripe.DisputeUpdateParams.Evidence;
    }
    namespace FileCreateParams {
        type Purpose = Stripe.FileCreateParams.Purpose;
        type FileLinkData = Stripe.FileCreateParams.FileLinkData;
    }
    namespace FileListParams {
        type Purpose = Stripe.FileListParams.Purpose;
    }
    namespace InvoiceCreateParams {
        type AutomaticTax = Stripe.InvoiceCreateParams.AutomaticTax;
        type CollectionMethod = Stripe.InvoiceCreateParams.CollectionMethod;
        type CustomField = Stripe.InvoiceCreateParams.CustomField;
        type Discount = Stripe.InvoiceCreateParams.Discount;
        type FromInvoice = Stripe.InvoiceCreateParams.FromInvoice;
        type Issuer = Stripe.InvoiceCreateParams.Issuer;
        type PaymentSettings = Stripe.InvoiceCreateParams.PaymentSettings;
        type PendingInvoiceItemsBehavior = Stripe.InvoiceCreateParams.PendingInvoiceItemsBehavior;
        type Rendering = Stripe.InvoiceCreateParams.Rendering;
        type ShippingCost = Stripe.InvoiceCreateParams.ShippingCost;
        type ShippingDetails = Stripe.InvoiceCreateParams.ShippingDetails;
        type TransferData = Stripe.InvoiceCreateParams.TransferData;
    }
    namespace InvoiceUpdateParams {
        type AutomaticTax = Stripe.InvoiceUpdateParams.AutomaticTax;
        type CollectionMethod = Stripe.InvoiceUpdateParams.CollectionMethod;
        type CustomField = Stripe.InvoiceUpdateParams.CustomField;
        type Discount = Stripe.InvoiceUpdateParams.Discount;
        type Issuer = Stripe.InvoiceUpdateParams.Issuer;
        type PaymentSettings = Stripe.InvoiceUpdateParams.PaymentSettings;
        type Rendering = Stripe.InvoiceUpdateParams.Rendering;
        type ShippingCost = Stripe.InvoiceUpdateParams.ShippingCost;
        type ShippingDetails = Stripe.InvoiceUpdateParams.ShippingDetails;
        type TransferData = Stripe.InvoiceUpdateParams.TransferData;
    }
    namespace InvoiceListParams {
        type CollectionMethod = Stripe.InvoiceListParams.CollectionMethod;
        type Status = Stripe.InvoiceListParams.Status;
    }
    namespace InvoiceAddLinesParams {
        type Line = Stripe.InvoiceAddLinesParams.Line;
    }
    namespace InvoiceCreatePreviewParams {
        type AutomaticTax = Stripe.InvoiceCreatePreviewParams.AutomaticTax;
        type CustomerDetails = Stripe.InvoiceCreatePreviewParams.CustomerDetails;
        type Discount = Stripe.InvoiceCreatePreviewParams.Discount;
        type InvoiceItem = Stripe.InvoiceCreatePreviewParams.InvoiceItem;
        type Issuer = Stripe.InvoiceCreatePreviewParams.Issuer;
        type PreviewMode = Stripe.InvoiceCreatePreviewParams.PreviewMode;
        type ScheduleDetails = Stripe.InvoiceCreatePreviewParams.ScheduleDetails;
        type SubscriptionDetails = Stripe.InvoiceCreatePreviewParams.SubscriptionDetails;
    }
    namespace InvoiceRemoveLinesParams {
        type Line = Stripe.InvoiceRemoveLinesParams.Line;
    }
    namespace InvoiceUpdateLinesParams {
        type Line = Stripe.InvoiceUpdateLinesParams.Line;
    }
    namespace InvoiceUpdateLineItemParams {
        type Discount = Stripe.InvoiceUpdateLineItemParams.Discount;
        type Period = Stripe.InvoiceUpdateLineItemParams.Period;
        type PriceData = Stripe.InvoiceUpdateLineItemParams.PriceData;
        type Pricing = Stripe.InvoiceUpdateLineItemParams.Pricing;
        type TaxAmount = Stripe.InvoiceUpdateLineItemParams.TaxAmount;
    }
    namespace InvoiceItemCreateParams {
        type Discount = Stripe.InvoiceItemCreateParams.Discount;
        type Period = Stripe.InvoiceItemCreateParams.Period;
        type PriceData = Stripe.InvoiceItemCreateParams.PriceData;
        type Pricing = Stripe.InvoiceItemCreateParams.Pricing;
        type TaxBehavior = Stripe.InvoiceItemCreateParams.TaxBehavior;
    }
    namespace InvoiceItemUpdateParams {
        type Discount = Stripe.InvoiceItemUpdateParams.Discount;
        type Period = Stripe.InvoiceItemUpdateParams.Period;
        type PriceData = Stripe.InvoiceItemUpdateParams.PriceData;
        type Pricing = Stripe.InvoiceItemUpdateParams.Pricing;
        type TaxBehavior = Stripe.InvoiceItemUpdateParams.TaxBehavior;
    }
    namespace InvoicePaymentListParams {
        type Payment = Stripe.InvoicePaymentListParams.Payment;
        type Status = Stripe.InvoicePaymentListParams.Status;
    }
    namespace InvoiceRenderingTemplateListParams {
        type Status = Stripe.InvoiceRenderingTemplateListParams.Status;
    }
    namespace PaymentIntentCreateParams {
        type AmountDetails = Stripe.PaymentIntentCreateParams.AmountDetails;
        type AutomaticPaymentMethods = Stripe.PaymentIntentCreateParams.AutomaticPaymentMethods;
        type CaptureMethod = Stripe.PaymentIntentCreateParams.CaptureMethod;
        type ConfirmationMethod = Stripe.PaymentIntentCreateParams.ConfirmationMethod;
        type ExcludedPaymentMethodType = Stripe.PaymentIntentCreateParams.ExcludedPaymentMethodType;
        type Hooks = Stripe.PaymentIntentCreateParams.Hooks;
        type MandateData = Stripe.PaymentIntentCreateParams.MandateData;
        type OffSession = Stripe.PaymentIntentCreateParams.OffSession;
        type PaymentDetails = Stripe.PaymentIntentCreateParams.PaymentDetails;
        type PaymentMethodData = Stripe.PaymentIntentCreateParams.PaymentMethodData;
        type PaymentMethodOptions = Stripe.PaymentIntentCreateParams.PaymentMethodOptions;
        type RadarOptions = Stripe.PaymentIntentCreateParams.RadarOptions;
        type SetupFutureUsage = Stripe.PaymentIntentCreateParams.SetupFutureUsage;
        type Shipping = Stripe.PaymentIntentCreateParams.Shipping;
        type TransferData = Stripe.PaymentIntentCreateParams.TransferData;
    }
    namespace PaymentIntentUpdateParams {
        type AmountDetails = Stripe.PaymentIntentUpdateParams.AmountDetails;
        type CaptureMethod = Stripe.PaymentIntentUpdateParams.CaptureMethod;
        type ExcludedPaymentMethodType = Stripe.PaymentIntentUpdateParams.ExcludedPaymentMethodType;
        type Hooks = Stripe.PaymentIntentUpdateParams.Hooks;
        type PaymentDetails = Stripe.PaymentIntentUpdateParams.PaymentDetails;
        type PaymentMethodData = Stripe.PaymentIntentUpdateParams.PaymentMethodData;
        type PaymentMethodOptions = Stripe.PaymentIntentUpdateParams.PaymentMethodOptions;
        type SetupFutureUsage = Stripe.PaymentIntentUpdateParams.SetupFutureUsage;
        type Shipping = Stripe.PaymentIntentUpdateParams.Shipping;
        type TransferData = Stripe.PaymentIntentUpdateParams.TransferData;
    }
    namespace PaymentIntentCancelParams {
        type CancellationReason = Stripe.PaymentIntentCancelParams.CancellationReason;
    }
    namespace PaymentIntentCaptureParams {
        type AmountDetails = Stripe.PaymentIntentCaptureParams.AmountDetails;
        type Hooks = Stripe.PaymentIntentCaptureParams.Hooks;
        type PaymentDetails = Stripe.PaymentIntentCaptureParams.PaymentDetails;
        type TransferData = Stripe.PaymentIntentCaptureParams.TransferData;
    }
    namespace PaymentIntentConfirmParams {
        type AmountDetails = Stripe.PaymentIntentConfirmParams.AmountDetails;
        type CaptureMethod = Stripe.PaymentIntentConfirmParams.CaptureMethod;
        type ExcludedPaymentMethodType = Stripe.PaymentIntentConfirmParams.ExcludedPaymentMethodType;
        type Hooks = Stripe.PaymentIntentConfirmParams.Hooks;
        type MandateData = Stripe.PaymentIntentConfirmParams.MandateData;
        type OffSession = Stripe.PaymentIntentConfirmParams.OffSession;
        type PaymentDetails = Stripe.PaymentIntentConfirmParams.PaymentDetails;
        type PaymentMethodData = Stripe.PaymentIntentConfirmParams.PaymentMethodData;
        type PaymentMethodOptions = Stripe.PaymentIntentConfirmParams.PaymentMethodOptions;
        type RadarOptions = Stripe.PaymentIntentConfirmParams.RadarOptions;
        type SetupFutureUsage = Stripe.PaymentIntentConfirmParams.SetupFutureUsage;
        type Shipping = Stripe.PaymentIntentConfirmParams.Shipping;
    }
    namespace PaymentIntentIncrementAuthorizationParams {
        type AmountDetails = Stripe.PaymentIntentIncrementAuthorizationParams.AmountDetails;
        type Hooks = Stripe.PaymentIntentIncrementAuthorizationParams.Hooks;
        type PaymentDetails = Stripe.PaymentIntentIncrementAuthorizationParams.PaymentDetails;
        type TransferData = Stripe.PaymentIntentIncrementAuthorizationParams.TransferData;
    }
    namespace PaymentLinkCreateParams {
        type LineItem = Stripe.PaymentLinkCreateParams.LineItem;
        type AfterCompletion = Stripe.PaymentLinkCreateParams.AfterCompletion;
        type AutomaticTax = Stripe.PaymentLinkCreateParams.AutomaticTax;
        type BillingAddressCollection = Stripe.PaymentLinkCreateParams.BillingAddressCollection;
        type ConsentCollection = Stripe.PaymentLinkCreateParams.ConsentCollection;
        type CustomField = Stripe.PaymentLinkCreateParams.CustomField;
        type CustomText = Stripe.PaymentLinkCreateParams.CustomText;
        type CustomerCreation = Stripe.PaymentLinkCreateParams.CustomerCreation;
        type InvoiceCreation = Stripe.PaymentLinkCreateParams.InvoiceCreation;
        type ManagedPayments = Stripe.PaymentLinkCreateParams.ManagedPayments;
        type NameCollection = Stripe.PaymentLinkCreateParams.NameCollection;
        type OptionalItem = Stripe.PaymentLinkCreateParams.OptionalItem;
        type PaymentIntentData = Stripe.PaymentLinkCreateParams.PaymentIntentData;
        type PaymentMethodCollection = Stripe.PaymentLinkCreateParams.PaymentMethodCollection;
        type PaymentMethodOptions = Stripe.PaymentLinkCreateParams.PaymentMethodOptions;
        type PaymentMethodType = Stripe.PaymentLinkCreateParams.PaymentMethodType;
        type PhoneNumberCollection = Stripe.PaymentLinkCreateParams.PhoneNumberCollection;
        type Restrictions = Stripe.PaymentLinkCreateParams.Restrictions;
        type ShippingAddressCollection = Stripe.PaymentLinkCreateParams.ShippingAddressCollection;
        type ShippingOption = Stripe.PaymentLinkCreateParams.ShippingOption;
        type SubmitType = Stripe.PaymentLinkCreateParams.SubmitType;
        type SubscriptionData = Stripe.PaymentLinkCreateParams.SubscriptionData;
        type TaxIdCollection = Stripe.PaymentLinkCreateParams.TaxIdCollection;
        type TransferData = Stripe.PaymentLinkCreateParams.TransferData;
    }
    namespace PaymentLinkUpdateParams {
        type AfterCompletion = Stripe.PaymentLinkUpdateParams.AfterCompletion;
        type AutomaticTax = Stripe.PaymentLinkUpdateParams.AutomaticTax;
        type BillingAddressCollection = Stripe.PaymentLinkUpdateParams.BillingAddressCollection;
        type CustomField = Stripe.PaymentLinkUpdateParams.CustomField;
        type CustomText = Stripe.PaymentLinkUpdateParams.CustomText;
        type CustomerCreation = Stripe.PaymentLinkUpdateParams.CustomerCreation;
        type InvoiceCreation = Stripe.PaymentLinkUpdateParams.InvoiceCreation;
        type LineItem = Stripe.PaymentLinkUpdateParams.LineItem;
        type NameCollection = Stripe.PaymentLinkUpdateParams.NameCollection;
        type OptionalItem = Stripe.PaymentLinkUpdateParams.OptionalItem;
        type PaymentIntentData = Stripe.PaymentLinkUpdateParams.PaymentIntentData;
        type PaymentMethodCollection = Stripe.PaymentLinkUpdateParams.PaymentMethodCollection;
        type PaymentMethodOptions = Stripe.PaymentLinkUpdateParams.PaymentMethodOptions;
        type PaymentMethodType = Stripe.PaymentLinkUpdateParams.PaymentMethodType;
        type PhoneNumberCollection = Stripe.PaymentLinkUpdateParams.PhoneNumberCollection;
        type Restrictions = Stripe.PaymentLinkUpdateParams.Restrictions;
        type ShippingAddressCollection = Stripe.PaymentLinkUpdateParams.ShippingAddressCollection;
        type SubmitType = Stripe.PaymentLinkUpdateParams.SubmitType;
        type SubscriptionData = Stripe.PaymentLinkUpdateParams.SubscriptionData;
        type TaxIdCollection = Stripe.PaymentLinkUpdateParams.TaxIdCollection;
    }
    namespace PaymentMethodCreateParams {
        type AcssDebit = Stripe.PaymentMethodCreateParams.AcssDebit;
        type Affirm = Stripe.PaymentMethodCreateParams.Affirm;
        type AfterpayClearpay = Stripe.PaymentMethodCreateParams.AfterpayClearpay;
        type Alipay = Stripe.PaymentMethodCreateParams.Alipay;
        type AllowRedisplay = Stripe.PaymentMethodCreateParams.AllowRedisplay;
        type Alma = Stripe.PaymentMethodCreateParams.Alma;
        type AmazonPay = Stripe.PaymentMethodCreateParams.AmazonPay;
        type AuBecsDebit = Stripe.PaymentMethodCreateParams.AuBecsDebit;
        type BacsDebit = Stripe.PaymentMethodCreateParams.BacsDebit;
        type Bancontact = Stripe.PaymentMethodCreateParams.Bancontact;
        type Billie = Stripe.PaymentMethodCreateParams.Billie;
        type BillingDetails = Stripe.PaymentMethodCreateParams.BillingDetails;
        type Bizum = Stripe.PaymentMethodCreateParams.Bizum;
        type Blik = Stripe.PaymentMethodCreateParams.Blik;
        type Boleto = Stripe.PaymentMethodCreateParams.Boleto;
        type Card = Stripe.PaymentMethodCreateParams.Card;
        type Cashapp = Stripe.PaymentMethodCreateParams.Cashapp;
        type Crypto = Stripe.PaymentMethodCreateParams.Crypto;
        type Custom = Stripe.PaymentMethodCreateParams.Custom;
        type CustomerBalance = Stripe.PaymentMethodCreateParams.CustomerBalance;
        type Eps = Stripe.PaymentMethodCreateParams.Eps;
        type Fpx = Stripe.PaymentMethodCreateParams.Fpx;
        type Giropay = Stripe.PaymentMethodCreateParams.Giropay;
        type Grabpay = Stripe.PaymentMethodCreateParams.Grabpay;
        type Ideal = Stripe.PaymentMethodCreateParams.Ideal;
        type InteracPresent = Stripe.PaymentMethodCreateParams.InteracPresent;
        type KakaoPay = Stripe.PaymentMethodCreateParams.KakaoPay;
        type Klarna = Stripe.PaymentMethodCreateParams.Klarna;
        type Konbini = Stripe.PaymentMethodCreateParams.Konbini;
        type KrCard = Stripe.PaymentMethodCreateParams.KrCard;
        type Link = Stripe.PaymentMethodCreateParams.Link;
        type MbWay = Stripe.PaymentMethodCreateParams.MbWay;
        type Mobilepay = Stripe.PaymentMethodCreateParams.Mobilepay;
        type Multibanco = Stripe.PaymentMethodCreateParams.Multibanco;
        type NaverPay = Stripe.PaymentMethodCreateParams.NaverPay;
        type NzBankAccount = Stripe.PaymentMethodCreateParams.NzBankAccount;
        type Oxxo = Stripe.PaymentMethodCreateParams.Oxxo;
        type P24 = Stripe.PaymentMethodCreateParams.P24;
        type PayByBank = Stripe.PaymentMethodCreateParams.PayByBank;
        type Payco = Stripe.PaymentMethodCreateParams.Payco;
        type Paynow = Stripe.PaymentMethodCreateParams.Paynow;
        type Paypal = Stripe.PaymentMethodCreateParams.Paypal;
        type Payto = Stripe.PaymentMethodCreateParams.Payto;
        type Pix = Stripe.PaymentMethodCreateParams.Pix;
        type Promptpay = Stripe.PaymentMethodCreateParams.Promptpay;
        type RadarOptions = Stripe.PaymentMethodCreateParams.RadarOptions;
        type RevolutPay = Stripe.PaymentMethodCreateParams.RevolutPay;
        type SamsungPay = Stripe.PaymentMethodCreateParams.SamsungPay;
        type Satispay = Stripe.PaymentMethodCreateParams.Satispay;
        type Scalapay = Stripe.PaymentMethodCreateParams.Scalapay;
        type SepaDebit = Stripe.PaymentMethodCreateParams.SepaDebit;
        type Sofort = Stripe.PaymentMethodCreateParams.Sofort;
        type Sunbit = Stripe.PaymentMethodCreateParams.Sunbit;
        type Swish = Stripe.PaymentMethodCreateParams.Swish;
        type Twint = Stripe.PaymentMethodCreateParams.Twint;
        type Type = Stripe.PaymentMethodCreateParams.Type;
        type Upi = Stripe.PaymentMethodCreateParams.Upi;
        type UsBankAccount = Stripe.PaymentMethodCreateParams.UsBankAccount;
        type WechatPay = Stripe.PaymentMethodCreateParams.WechatPay;
        type Zip = Stripe.PaymentMethodCreateParams.Zip;
    }
    namespace PaymentMethodUpdateParams {
        type AllowRedisplay = Stripe.PaymentMethodUpdateParams.AllowRedisplay;
        type BillingDetails = Stripe.PaymentMethodUpdateParams.BillingDetails;
        type Card = Stripe.PaymentMethodUpdateParams.Card;
        type Payto = Stripe.PaymentMethodUpdateParams.Payto;
        type UsBankAccount = Stripe.PaymentMethodUpdateParams.UsBankAccount;
    }
    namespace PaymentMethodListParams {
        type AllowRedisplay = Stripe.PaymentMethodListParams.AllowRedisplay;
        type Type = Stripe.PaymentMethodListParams.Type;
    }
    namespace PaymentMethodConfigurationCreateParams {
        type AcssDebit = Stripe.PaymentMethodConfigurationCreateParams.AcssDebit;
        type Affirm = Stripe.PaymentMethodConfigurationCreateParams.Affirm;
        type AfterpayClearpay = Stripe.PaymentMethodConfigurationCreateParams.AfterpayClearpay;
        type Alipay = Stripe.PaymentMethodConfigurationCreateParams.Alipay;
        type Alma = Stripe.PaymentMethodConfigurationCreateParams.Alma;
        type AmazonPay = Stripe.PaymentMethodConfigurationCreateParams.AmazonPay;
        type ApplePay = Stripe.PaymentMethodConfigurationCreateParams.ApplePay;
        type ApplePayLater = Stripe.PaymentMethodConfigurationCreateParams.ApplePayLater;
        type AuBecsDebit = Stripe.PaymentMethodConfigurationCreateParams.AuBecsDebit;
        type BacsDebit = Stripe.PaymentMethodConfigurationCreateParams.BacsDebit;
        type Bancontact = Stripe.PaymentMethodConfigurationCreateParams.Bancontact;
        type Billie = Stripe.PaymentMethodConfigurationCreateParams.Billie;
        type Bizum = Stripe.PaymentMethodConfigurationCreateParams.Bizum;
        type Blik = Stripe.PaymentMethodConfigurationCreateParams.Blik;
        type Boleto = Stripe.PaymentMethodConfigurationCreateParams.Boleto;
        type Card = Stripe.PaymentMethodConfigurationCreateParams.Card;
        type CartesBancaires = Stripe.PaymentMethodConfigurationCreateParams.CartesBancaires;
        type Cashapp = Stripe.PaymentMethodConfigurationCreateParams.Cashapp;
        type Crypto = Stripe.PaymentMethodConfigurationCreateParams.Crypto;
        type CustomerBalance = Stripe.PaymentMethodConfigurationCreateParams.CustomerBalance;
        type Eps = Stripe.PaymentMethodConfigurationCreateParams.Eps;
        type Fpx = Stripe.PaymentMethodConfigurationCreateParams.Fpx;
        type FrMealVoucherConecs = Stripe.PaymentMethodConfigurationCreateParams.FrMealVoucherConecs;
        type Giropay = Stripe.PaymentMethodConfigurationCreateParams.Giropay;
        type GooglePay = Stripe.PaymentMethodConfigurationCreateParams.GooglePay;
        type Grabpay = Stripe.PaymentMethodConfigurationCreateParams.Grabpay;
        type Ideal = Stripe.PaymentMethodConfigurationCreateParams.Ideal;
        type Jcb = Stripe.PaymentMethodConfigurationCreateParams.Jcb;
        type KakaoPay = Stripe.PaymentMethodConfigurationCreateParams.KakaoPay;
        type Klarna = Stripe.PaymentMethodConfigurationCreateParams.Klarna;
        type Konbini = Stripe.PaymentMethodConfigurationCreateParams.Konbini;
        type KrCard = Stripe.PaymentMethodConfigurationCreateParams.KrCard;
        type Link = Stripe.PaymentMethodConfigurationCreateParams.Link;
        type MbWay = Stripe.PaymentMethodConfigurationCreateParams.MbWay;
        type Mobilepay = Stripe.PaymentMethodConfigurationCreateParams.Mobilepay;
        type Multibanco = Stripe.PaymentMethodConfigurationCreateParams.Multibanco;
        type NaverPay = Stripe.PaymentMethodConfigurationCreateParams.NaverPay;
        type NzBankAccount = Stripe.PaymentMethodConfigurationCreateParams.NzBankAccount;
        type Oxxo = Stripe.PaymentMethodConfigurationCreateParams.Oxxo;
        type P24 = Stripe.PaymentMethodConfigurationCreateParams.P24;
        type PayByBank = Stripe.PaymentMethodConfigurationCreateParams.PayByBank;
        type Payco = Stripe.PaymentMethodConfigurationCreateParams.Payco;
        type Paynow = Stripe.PaymentMethodConfigurationCreateParams.Paynow;
        type Paypal = Stripe.PaymentMethodConfigurationCreateParams.Paypal;
        type Payto = Stripe.PaymentMethodConfigurationCreateParams.Payto;
        type Pix = Stripe.PaymentMethodConfigurationCreateParams.Pix;
        type Promptpay = Stripe.PaymentMethodConfigurationCreateParams.Promptpay;
        type RevolutPay = Stripe.PaymentMethodConfigurationCreateParams.RevolutPay;
        type SamsungPay = Stripe.PaymentMethodConfigurationCreateParams.SamsungPay;
        type Satispay = Stripe.PaymentMethodConfigurationCreateParams.Satispay;
        type Scalapay = Stripe.PaymentMethodConfigurationCreateParams.Scalapay;
        type SepaDebit = Stripe.PaymentMethodConfigurationCreateParams.SepaDebit;
        type Sofort = Stripe.PaymentMethodConfigurationCreateParams.Sofort;
        type Sunbit = Stripe.PaymentMethodConfigurationCreateParams.Sunbit;
        type Swish = Stripe.PaymentMethodConfigurationCreateParams.Swish;
        type Twint = Stripe.PaymentMethodConfigurationCreateParams.Twint;
        type Upi = Stripe.PaymentMethodConfigurationCreateParams.Upi;
        type UsBankAccount = Stripe.PaymentMethodConfigurationCreateParams.UsBankAccount;
        type WechatPay = Stripe.PaymentMethodConfigurationCreateParams.WechatPay;
        type Zip = Stripe.PaymentMethodConfigurationCreateParams.Zip;
    }
    namespace PaymentMethodConfigurationUpdateParams {
        type AcssDebit = Stripe.PaymentMethodConfigurationUpdateParams.AcssDebit;
        type Affirm = Stripe.PaymentMethodConfigurationUpdateParams.Affirm;
        type AfterpayClearpay = Stripe.PaymentMethodConfigurationUpdateParams.AfterpayClearpay;
        type Alipay = Stripe.PaymentMethodConfigurationUpdateParams.Alipay;
        type Alma = Stripe.PaymentMethodConfigurationUpdateParams.Alma;
        type AmazonPay = Stripe.PaymentMethodConfigurationUpdateParams.AmazonPay;
        type ApplePay = Stripe.PaymentMethodConfigurationUpdateParams.ApplePay;
        type ApplePayLater = Stripe.PaymentMethodConfigurationUpdateParams.ApplePayLater;
        type AuBecsDebit = Stripe.PaymentMethodConfigurationUpdateParams.AuBecsDebit;
        type BacsDebit = Stripe.PaymentMethodConfigurationUpdateParams.BacsDebit;
        type Bancontact = Stripe.PaymentMethodConfigurationUpdateParams.Bancontact;
        type Billie = Stripe.PaymentMethodConfigurationUpdateParams.Billie;
        type Bizum = Stripe.PaymentMethodConfigurationUpdateParams.Bizum;
        type Blik = Stripe.PaymentMethodConfigurationUpdateParams.Blik;
        type Boleto = Stripe.PaymentMethodConfigurationUpdateParams.Boleto;
        type Card = Stripe.PaymentMethodConfigurationUpdateParams.Card;
        type CartesBancaires = Stripe.PaymentMethodConfigurationUpdateParams.CartesBancaires;
        type Cashapp = Stripe.PaymentMethodConfigurationUpdateParams.Cashapp;
        type Crypto = Stripe.PaymentMethodConfigurationUpdateParams.Crypto;
        type CustomerBalance = Stripe.PaymentMethodConfigurationUpdateParams.CustomerBalance;
        type Eps = Stripe.PaymentMethodConfigurationUpdateParams.Eps;
        type Fpx = Stripe.PaymentMethodConfigurationUpdateParams.Fpx;
        type FrMealVoucherConecs = Stripe.PaymentMethodConfigurationUpdateParams.FrMealVoucherConecs;
        type Giropay = Stripe.PaymentMethodConfigurationUpdateParams.Giropay;
        type GooglePay = Stripe.PaymentMethodConfigurationUpdateParams.GooglePay;
        type Grabpay = Stripe.PaymentMethodConfigurationUpdateParams.Grabpay;
        type Ideal = Stripe.PaymentMethodConfigurationUpdateParams.Ideal;
        type Jcb = Stripe.PaymentMethodConfigurationUpdateParams.Jcb;
        type KakaoPay = Stripe.PaymentMethodConfigurationUpdateParams.KakaoPay;
        type Klarna = Stripe.PaymentMethodConfigurationUpdateParams.Klarna;
        type Konbini = Stripe.PaymentMethodConfigurationUpdateParams.Konbini;
        type KrCard = Stripe.PaymentMethodConfigurationUpdateParams.KrCard;
        type Link = Stripe.PaymentMethodConfigurationUpdateParams.Link;
        type MbWay = Stripe.PaymentMethodConfigurationUpdateParams.MbWay;
        type Mobilepay = Stripe.PaymentMethodConfigurationUpdateParams.Mobilepay;
        type Multibanco = Stripe.PaymentMethodConfigurationUpdateParams.Multibanco;
        type NaverPay = Stripe.PaymentMethodConfigurationUpdateParams.NaverPay;
        type NzBankAccount = Stripe.PaymentMethodConfigurationUpdateParams.NzBankAccount;
        type Oxxo = Stripe.PaymentMethodConfigurationUpdateParams.Oxxo;
        type P24 = Stripe.PaymentMethodConfigurationUpdateParams.P24;
        type PayByBank = Stripe.PaymentMethodConfigurationUpdateParams.PayByBank;
        type Payco = Stripe.PaymentMethodConfigurationUpdateParams.Payco;
        type Paynow = Stripe.PaymentMethodConfigurationUpdateParams.Paynow;
        type Paypal = Stripe.PaymentMethodConfigurationUpdateParams.Paypal;
        type Payto = Stripe.PaymentMethodConfigurationUpdateParams.Payto;
        type Pix = Stripe.PaymentMethodConfigurationUpdateParams.Pix;
        type Promptpay = Stripe.PaymentMethodConfigurationUpdateParams.Promptpay;
        type RevolutPay = Stripe.PaymentMethodConfigurationUpdateParams.RevolutPay;
        type SamsungPay = Stripe.PaymentMethodConfigurationUpdateParams.SamsungPay;
        type Satispay = Stripe.PaymentMethodConfigurationUpdateParams.Satispay;
        type Scalapay = Stripe.PaymentMethodConfigurationUpdateParams.Scalapay;
        type SepaDebit = Stripe.PaymentMethodConfigurationUpdateParams.SepaDebit;
        type Sofort = Stripe.PaymentMethodConfigurationUpdateParams.Sofort;
        type Sunbit = Stripe.PaymentMethodConfigurationUpdateParams.Sunbit;
        type Swish = Stripe.PaymentMethodConfigurationUpdateParams.Swish;
        type Twint = Stripe.PaymentMethodConfigurationUpdateParams.Twint;
        type Upi = Stripe.PaymentMethodConfigurationUpdateParams.Upi;
        type UsBankAccount = Stripe.PaymentMethodConfigurationUpdateParams.UsBankAccount;
        type WechatPay = Stripe.PaymentMethodConfigurationUpdateParams.WechatPay;
        type Zip = Stripe.PaymentMethodConfigurationUpdateParams.Zip;
    }
    namespace PaymentRecordReportPaymentParams {
        type AmountRequested = Stripe.PaymentRecordReportPaymentParams.AmountRequested;
        type PaymentMethodDetails = Stripe.PaymentRecordReportPaymentParams.PaymentMethodDetails;
        type CustomerDetails = Stripe.PaymentRecordReportPaymentParams.CustomerDetails;
        type CustomerPresence = Stripe.PaymentRecordReportPaymentParams.CustomerPresence;
        type Failed = Stripe.PaymentRecordReportPaymentParams.Failed;
        type Guaranteed = Stripe.PaymentRecordReportPaymentParams.Guaranteed;
        type Outcome = Stripe.PaymentRecordReportPaymentParams.Outcome;
        type ProcessorDetails = Stripe.PaymentRecordReportPaymentParams.ProcessorDetails;
        type ShippingDetails = Stripe.PaymentRecordReportPaymentParams.ShippingDetails;
    }
    namespace PaymentRecordReportPaymentAttemptParams {
        type Failed = Stripe.PaymentRecordReportPaymentAttemptParams.Failed;
        type Guaranteed = Stripe.PaymentRecordReportPaymentAttemptParams.Guaranteed;
        type Outcome = Stripe.PaymentRecordReportPaymentAttemptParams.Outcome;
        type PaymentMethodDetails = Stripe.PaymentRecordReportPaymentAttemptParams.PaymentMethodDetails;
        type ShippingDetails = Stripe.PaymentRecordReportPaymentAttemptParams.ShippingDetails;
    }
    namespace PaymentRecordReportPaymentAttemptInformationalParams {
        type CustomerDetails = Stripe.PaymentRecordReportPaymentAttemptInformationalParams.CustomerDetails;
        type ShippingDetails = Stripe.PaymentRecordReportPaymentAttemptInformationalParams.ShippingDetails;
    }
    namespace PaymentRecordReportRefundParams {
        type ProcessorDetails = Stripe.PaymentRecordReportRefundParams.ProcessorDetails;
        type Refunded = Stripe.PaymentRecordReportRefundParams.Refunded;
        type Amount = Stripe.PaymentRecordReportRefundParams.Amount;
    }
    namespace PayoutCreateParams {
        type Method = Stripe.PayoutCreateParams.Method;
        type SourceType = Stripe.PayoutCreateParams.SourceType;
    }
    namespace PlanCreateParams {
        type Interval = Stripe.PlanCreateParams.Interval;
        type BillingScheme = Stripe.PlanCreateParams.BillingScheme;
        type Product = Stripe.PlanCreateParams.Product;
        type Tier = Stripe.PlanCreateParams.Tier;
        type TiersMode = Stripe.PlanCreateParams.TiersMode;
        type TransformUsage = Stripe.PlanCreateParams.TransformUsage;
        type UsageType = Stripe.PlanCreateParams.UsageType;
    }
    namespace PriceCreateParams {
        type BillingScheme = Stripe.PriceCreateParams.BillingScheme;
        type CurrencyOptions = Stripe.PriceCreateParams.CurrencyOptions;
        type CustomUnitAmount = Stripe.PriceCreateParams.CustomUnitAmount;
        type ProductData = Stripe.PriceCreateParams.ProductData;
        type Recurring = Stripe.PriceCreateParams.Recurring;
        type TaxBehavior = Stripe.PriceCreateParams.TaxBehavior;
        type Tier = Stripe.PriceCreateParams.Tier;
        type TiersMode = Stripe.PriceCreateParams.TiersMode;
        type TransformQuantity = Stripe.PriceCreateParams.TransformQuantity;
    }
    namespace PriceUpdateParams {
        type CurrencyOptions = Stripe.PriceUpdateParams.CurrencyOptions;
        type TaxBehavior = Stripe.PriceUpdateParams.TaxBehavior;
    }
    namespace PriceListParams {
        type Recurring = Stripe.PriceListParams.Recurring;
        type Type = Stripe.PriceListParams.Type;
    }
    namespace ProductCreateParams {
        type DefaultPriceData = Stripe.ProductCreateParams.DefaultPriceData;
        type MarketingFeature = Stripe.ProductCreateParams.MarketingFeature;
        type PackageDimensions = Stripe.ProductCreateParams.PackageDimensions;
        type Type = Stripe.ProductCreateParams.Type;
    }
    namespace ProductUpdateParams {
        type MarketingFeature = Stripe.ProductUpdateParams.MarketingFeature;
        type PackageDimensions = Stripe.ProductUpdateParams.PackageDimensions;
    }
    namespace ProductListParams {
        type Type = Stripe.ProductListParams.Type;
    }
    namespace PromotionCodeCreateParams {
        type Promotion = Stripe.PromotionCodeCreateParams.Promotion;
        type Restrictions = Stripe.PromotionCodeCreateParams.Restrictions;
    }
    namespace PromotionCodeUpdateParams {
        type Restrictions = Stripe.PromotionCodeUpdateParams.Restrictions;
    }
    namespace QuoteCreateParams {
        type AutomaticTax = Stripe.QuoteCreateParams.AutomaticTax;
        type CollectionMethod = Stripe.QuoteCreateParams.CollectionMethod;
        type Discount = Stripe.QuoteCreateParams.Discount;
        type FromQuote = Stripe.QuoteCreateParams.FromQuote;
        type InvoiceSettings = Stripe.QuoteCreateParams.InvoiceSettings;
        type LineItem = Stripe.QuoteCreateParams.LineItem;
        type SubscriptionData = Stripe.QuoteCreateParams.SubscriptionData;
        type TransferData = Stripe.QuoteCreateParams.TransferData;
    }
    namespace QuoteUpdateParams {
        type AutomaticTax = Stripe.QuoteUpdateParams.AutomaticTax;
        type CollectionMethod = Stripe.QuoteUpdateParams.CollectionMethod;
        type Discount = Stripe.QuoteUpdateParams.Discount;
        type InvoiceSettings = Stripe.QuoteUpdateParams.InvoiceSettings;
        type LineItem = Stripe.QuoteUpdateParams.LineItem;
        type SubscriptionData = Stripe.QuoteUpdateParams.SubscriptionData;
        type TransferData = Stripe.QuoteUpdateParams.TransferData;
    }
    namespace QuoteListParams {
        type Status = Stripe.QuoteListParams.Status;
    }
    namespace RefundCreateParams {
        type Reason = Stripe.RefundCreateParams.Reason;
    }
    namespace SetupIntentCreateParams {
        type AutomaticPaymentMethods = Stripe.SetupIntentCreateParams.AutomaticPaymentMethods;
        type ExcludedPaymentMethodType = Stripe.SetupIntentCreateParams.ExcludedPaymentMethodType;
        type FlowDirection = Stripe.SetupIntentCreateParams.FlowDirection;
        type MandateData = Stripe.SetupIntentCreateParams.MandateData;
        type PaymentMethodData = Stripe.SetupIntentCreateParams.PaymentMethodData;
        type PaymentMethodOptions = Stripe.SetupIntentCreateParams.PaymentMethodOptions;
        type SingleUse = Stripe.SetupIntentCreateParams.SingleUse;
        type Usage = Stripe.SetupIntentCreateParams.Usage;
    }
    namespace SetupIntentUpdateParams {
        type ExcludedPaymentMethodType = Stripe.SetupIntentUpdateParams.ExcludedPaymentMethodType;
        type FlowDirection = Stripe.SetupIntentUpdateParams.FlowDirection;
        type PaymentMethodData = Stripe.SetupIntentUpdateParams.PaymentMethodData;
        type PaymentMethodOptions = Stripe.SetupIntentUpdateParams.PaymentMethodOptions;
    }
    namespace SetupIntentCancelParams {
        type CancellationReason = Stripe.SetupIntentCancelParams.CancellationReason;
    }
    namespace SetupIntentConfirmParams {
        type MandateData = Stripe.SetupIntentConfirmParams.MandateData;
        type PaymentMethodData = Stripe.SetupIntentConfirmParams.PaymentMethodData;
        type PaymentMethodOptions = Stripe.SetupIntentConfirmParams.PaymentMethodOptions;
    }
    namespace ShippingRateCreateParams {
        type DeliveryEstimate = Stripe.ShippingRateCreateParams.DeliveryEstimate;
        type FixedAmount = Stripe.ShippingRateCreateParams.FixedAmount;
        type TaxBehavior = Stripe.ShippingRateCreateParams.TaxBehavior;
    }
    namespace ShippingRateUpdateParams {
        type FixedAmount = Stripe.ShippingRateUpdateParams.FixedAmount;
        type TaxBehavior = Stripe.ShippingRateUpdateParams.TaxBehavior;
    }
    namespace SourceCreateParams {
        type Flow = Stripe.SourceCreateParams.Flow;
        type Mandate = Stripe.SourceCreateParams.Mandate;
        type Owner = Stripe.SourceCreateParams.Owner;
        type Receiver = Stripe.SourceCreateParams.Receiver;
        type Redirect = Stripe.SourceCreateParams.Redirect;
        type SourceOrder = Stripe.SourceCreateParams.SourceOrder;
        type Usage = Stripe.SourceCreateParams.Usage;
    }
    namespace SourceUpdateParams {
        type Mandate = Stripe.SourceUpdateParams.Mandate;
        type Owner = Stripe.SourceUpdateParams.Owner;
        type SourceOrder = Stripe.SourceUpdateParams.SourceOrder;
    }
    namespace SubscriptionCreateParams {
        type AddInvoiceItem = Stripe.SubscriptionCreateParams.AddInvoiceItem;
        type AutomaticTax = Stripe.SubscriptionCreateParams.AutomaticTax;
        type BillingCycleAnchorConfig = Stripe.SubscriptionCreateParams.BillingCycleAnchorConfig;
        type BillingMode = Stripe.SubscriptionCreateParams.BillingMode;
        type BillingSchedule = Stripe.SubscriptionCreateParams.BillingSchedule;
        type BillingThresholds = Stripe.SubscriptionCreateParams.BillingThresholds;
        type CancelAt = Stripe.SubscriptionCreateParams.CancelAt;
        type CollectionMethod = Stripe.SubscriptionCreateParams.CollectionMethod;
        type Discount = Stripe.SubscriptionCreateParams.Discount;
        type InvoiceSettings = Stripe.SubscriptionCreateParams.InvoiceSettings;
        type Item = Stripe.SubscriptionCreateParams.Item;
        type PaymentBehavior = Stripe.SubscriptionCreateParams.PaymentBehavior;
        type PaymentSettings = Stripe.SubscriptionCreateParams.PaymentSettings;
        type PendingInvoiceItemInterval = Stripe.SubscriptionCreateParams.PendingInvoiceItemInterval;
        type ProrationBehavior = Stripe.SubscriptionCreateParams.ProrationBehavior;
        type TransferData = Stripe.SubscriptionCreateParams.TransferData;
        type TrialSettings = Stripe.SubscriptionCreateParams.TrialSettings;
    }
    namespace SubscriptionUpdateParams {
        type AddInvoiceItem = Stripe.SubscriptionUpdateParams.AddInvoiceItem;
        type AutomaticTax = Stripe.SubscriptionUpdateParams.AutomaticTax;
        type BillingCycleAnchor = Stripe.SubscriptionUpdateParams.BillingCycleAnchor;
        type BillingSchedule = Stripe.SubscriptionUpdateParams.BillingSchedule;
        type BillingThresholds = Stripe.SubscriptionUpdateParams.BillingThresholds;
        type CancelAt = Stripe.SubscriptionUpdateParams.CancelAt;
        type CancellationDetails = Stripe.SubscriptionUpdateParams.CancellationDetails;
        type CollectionMethod = Stripe.SubscriptionUpdateParams.CollectionMethod;
        type Discount = Stripe.SubscriptionUpdateParams.Discount;
        type InvoiceSettings = Stripe.SubscriptionUpdateParams.InvoiceSettings;
        type Item = Stripe.SubscriptionUpdateParams.Item;
        type PauseCollection = Stripe.SubscriptionUpdateParams.PauseCollection;
        type PaymentBehavior = Stripe.SubscriptionUpdateParams.PaymentBehavior;
        type PaymentSettings = Stripe.SubscriptionUpdateParams.PaymentSettings;
        type PendingInvoiceItemInterval = Stripe.SubscriptionUpdateParams.PendingInvoiceItemInterval;
        type ProrationBehavior = Stripe.SubscriptionUpdateParams.ProrationBehavior;
        type TransferData = Stripe.SubscriptionUpdateParams.TransferData;
        type TrialSettings = Stripe.SubscriptionUpdateParams.TrialSettings;
    }
    namespace SubscriptionListParams {
        type AutomaticTax = Stripe.SubscriptionListParams.AutomaticTax;
        type CollectionMethod = Stripe.SubscriptionListParams.CollectionMethod;
        type Status = Stripe.SubscriptionListParams.Status;
    }
    namespace SubscriptionCancelParams {
        type CancellationDetails = Stripe.SubscriptionCancelParams.CancellationDetails;
    }
    namespace SubscriptionMigrateParams {
        type BillingMode = Stripe.SubscriptionMigrateParams.BillingMode;
    }
    namespace SubscriptionResumeParams {
        type BillingCycleAnchor = Stripe.SubscriptionResumeParams.BillingCycleAnchor;
        type ProrationBehavior = Stripe.SubscriptionResumeParams.ProrationBehavior;
    }
    namespace SubscriptionItemCreateParams {
        type BillingThresholds = Stripe.SubscriptionItemCreateParams.BillingThresholds;
        type Discount = Stripe.SubscriptionItemCreateParams.Discount;
        type PaymentBehavior = Stripe.SubscriptionItemCreateParams.PaymentBehavior;
        type PriceData = Stripe.SubscriptionItemCreateParams.PriceData;
        type ProrationBehavior = Stripe.SubscriptionItemCreateParams.ProrationBehavior;
    }
    namespace SubscriptionItemUpdateParams {
        type BillingThresholds = Stripe.SubscriptionItemUpdateParams.BillingThresholds;
        type Discount = Stripe.SubscriptionItemUpdateParams.Discount;
        type PaymentBehavior = Stripe.SubscriptionItemUpdateParams.PaymentBehavior;
        type PriceData = Stripe.SubscriptionItemUpdateParams.PriceData;
        type ProrationBehavior = Stripe.SubscriptionItemUpdateParams.ProrationBehavior;
    }
    namespace SubscriptionItemDeleteParams {
        type PaymentBehavior = Stripe.SubscriptionItemDeleteParams.PaymentBehavior;
        type ProrationBehavior = Stripe.SubscriptionItemDeleteParams.ProrationBehavior;
    }
    namespace SubscriptionScheduleCreateParams {
        type BillingMode = Stripe.SubscriptionScheduleCreateParams.BillingMode;
        type DefaultSettings = Stripe.SubscriptionScheduleCreateParams.DefaultSettings;
        type EndBehavior = Stripe.SubscriptionScheduleCreateParams.EndBehavior;
        type Phase = Stripe.SubscriptionScheduleCreateParams.Phase;
    }
    namespace SubscriptionScheduleUpdateParams {
        type DefaultSettings = Stripe.SubscriptionScheduleUpdateParams.DefaultSettings;
        type EndBehavior = Stripe.SubscriptionScheduleUpdateParams.EndBehavior;
        type Phase = Stripe.SubscriptionScheduleUpdateParams.Phase;
        type ProrationBehavior = Stripe.SubscriptionScheduleUpdateParams.ProrationBehavior;
    }
    namespace TaxIdCreateParams {
        type Type = Stripe.TaxIdCreateParams.Type;
        type Owner = Stripe.TaxIdCreateParams.Owner;
    }
    namespace TaxIdListParams {
        type Owner = Stripe.TaxIdListParams.Owner;
    }
    namespace TaxRateCreateParams {
        type TaxType = Stripe.TaxRateCreateParams.TaxType;
    }
    namespace TaxRateUpdateParams {
        type TaxType = Stripe.TaxRateUpdateParams.TaxType;
    }
    namespace TokenCreateParams {
        type Account = Stripe.TokenCreateParams.Account;
        type BankAccount = Stripe.TokenCreateParams.BankAccount;
        type Card = Stripe.TokenCreateParams.Card;
        type CvcUpdate = Stripe.TokenCreateParams.CvcUpdate;
        type Person = Stripe.TokenCreateParams.Person;
        type Pii = Stripe.TokenCreateParams.Pii;
    }
    namespace TopupListParams {
        type Status = Stripe.TopupListParams.Status;
    }
    namespace TransferCreateParams {
        type SourceType = Stripe.TransferCreateParams.SourceType;
    }
    namespace WebhookEndpointCreateParams {
        type EnabledEvent = Stripe.WebhookEndpointCreateParams.EnabledEvent;
        type ApiVersion = Stripe.WebhookEndpointCreateParams.ApiVersion;
    }
    namespace WebhookEndpointUpdateParams {
        type EnabledEvent = Stripe.WebhookEndpointUpdateParams.EnabledEvent;
    }
    type Apps = Stripe.Apps;
    type Billing = Stripe.Billing;
    type BillingPortal = Stripe.BillingPortal;
    type Checkout = Stripe.Checkout;
    type Climate = Stripe.Climate;
    type Entitlements = Stripe.Entitlements;
    type FinancialConnections = Stripe.FinancialConnections;
    type Forwarding = Stripe.Forwarding;
    type Identity = Stripe.Identity;
    type Issuing = Stripe.Issuing;
    type Radar = Stripe.Radar;
    type Reporting = Stripe.Reporting;
    type Sigma = Stripe.Sigma;
    type Tax = Stripe.Tax;
    type Terminal = Stripe.Terminal;
    type TestHelpers = Stripe.TestHelpers;
    type Treasury = Stripe.Treasury;
    type V2 = Stripe.V2;
    type Reserve = Stripe.Reserve;
    namespace Apps {
        type Secret = Stripe.Apps.Secret;
        type SecretCreateParams = Stripe.Apps.SecretCreateParams;
        type SecretListParams = Stripe.Apps.SecretListParams;
        type SecretDeleteWhereParams = Stripe.Apps.SecretDeleteWhereParams;
        type SecretFindParams = Stripe.Apps.SecretFindParams;
        type SecretResource = Stripe.Apps.SecretResource;
        namespace SecretCreateParams {
            type Scope = Stripe.Apps.SecretCreateParams.Scope;
        }
        namespace SecretListParams {
            type Scope = Stripe.Apps.SecretListParams.Scope;
        }
        namespace SecretDeleteWhereParams {
            type Scope = Stripe.Apps.SecretDeleteWhereParams.Scope;
        }
        namespace SecretFindParams {
            type Scope = Stripe.Apps.SecretFindParams.Scope;
        }
    }
    namespace Billing {
        type Alert = Stripe.Billing.Alert;
        type AlertCreateParams = Stripe.Billing.AlertCreateParams;
        type AlertRetrieveParams = Stripe.Billing.AlertRetrieveParams;
        type AlertListParams = Stripe.Billing.AlertListParams;
        type AlertActivateParams = Stripe.Billing.AlertActivateParams;
        type AlertArchiveParams = Stripe.Billing.AlertArchiveParams;
        type AlertDeactivateParams = Stripe.Billing.AlertDeactivateParams;
        type AlertResource = Stripe.Billing.AlertResource;
        type CreditBalanceSummary = Stripe.Billing.CreditBalanceSummary;
        type CreditBalanceSummaryRetrieveParams = Stripe.Billing.CreditBalanceSummaryRetrieveParams;
        type CreditBalanceSummaryResource = Stripe.Billing.CreditBalanceSummaryResource;
        type CreditBalanceTransaction = Stripe.Billing.CreditBalanceTransaction;
        type CreditBalanceTransactionRetrieveParams = Stripe.Billing.CreditBalanceTransactionRetrieveParams;
        type CreditBalanceTransactionListParams = Stripe.Billing.CreditBalanceTransactionListParams;
        type CreditBalanceTransactionResource = Stripe.Billing.CreditBalanceTransactionResource;
        type CreditGrant = Stripe.Billing.CreditGrant;
        type CreditGrantCreateParams = Stripe.Billing.CreditGrantCreateParams;
        type CreditGrantRetrieveParams = Stripe.Billing.CreditGrantRetrieveParams;
        type CreditGrantUpdateParams = Stripe.Billing.CreditGrantUpdateParams;
        type CreditGrantListParams = Stripe.Billing.CreditGrantListParams;
        type CreditGrantExpireParams = Stripe.Billing.CreditGrantExpireParams;
        type CreditGrantVoidGrantParams = Stripe.Billing.CreditGrantVoidGrantParams;
        type CreditGrantResource = Stripe.Billing.CreditGrantResource;
        type Meter = Stripe.Billing.Meter;
        type MeterCreateParams = Stripe.Billing.MeterCreateParams;
        type MeterRetrieveParams = Stripe.Billing.MeterRetrieveParams;
        type MeterUpdateParams = Stripe.Billing.MeterUpdateParams;
        type MeterListParams = Stripe.Billing.MeterListParams;
        type MeterDeactivateParams = Stripe.Billing.MeterDeactivateParams;
        type MeterListEventSummariesParams = Stripe.Billing.MeterListEventSummariesParams;
        type MeterReactivateParams = Stripe.Billing.MeterReactivateParams;
        type MeterResource = Stripe.Billing.MeterResource;
        type MeterEvent = Stripe.Billing.MeterEvent;
        type MeterEventCreateParams = Stripe.Billing.MeterEventCreateParams;
        type MeterEventResource = Stripe.Billing.MeterEventResource;
        type MeterEventAdjustment = Stripe.Billing.MeterEventAdjustment;
        type MeterEventAdjustmentCreateParams = Stripe.Billing.MeterEventAdjustmentCreateParams;
        type MeterEventAdjustmentResource = Stripe.Billing.MeterEventAdjustmentResource;
        type AlertTriggered = Stripe.Billing.AlertTriggered;
        type MeterEventSummary = Stripe.Billing.MeterEventSummary;
        namespace AlertCreateParams {
            type UsageThreshold = Stripe.Billing.AlertCreateParams.UsageThreshold;
        }
        namespace CreditBalanceSummaryRetrieveParams {
            type Filter = Stripe.Billing.CreditBalanceSummaryRetrieveParams.Filter;
        }
        namespace CreditGrantCreateParams {
            type Amount = Stripe.Billing.CreditGrantCreateParams.Amount;
            type ApplicabilityConfig = Stripe.Billing.CreditGrantCreateParams.ApplicabilityConfig;
            type Category = Stripe.Billing.CreditGrantCreateParams.Category;
        }
        namespace MeterCreateParams {
            type DefaultAggregation = Stripe.Billing.MeterCreateParams.DefaultAggregation;
            type CustomerMapping = Stripe.Billing.MeterCreateParams.CustomerMapping;
            type EventTimeWindow = Stripe.Billing.MeterCreateParams.EventTimeWindow;
            type ValueSettings = Stripe.Billing.MeterCreateParams.ValueSettings;
        }
        namespace MeterListParams {
            type Status = Stripe.Billing.MeterListParams.Status;
        }
        namespace MeterListEventSummariesParams {
            type ValueGroupingWindow = Stripe.Billing.MeterListEventSummariesParams.ValueGroupingWindow;
        }
        namespace MeterEventAdjustmentCreateParams {
            type Cancel = Stripe.Billing.MeterEventAdjustmentCreateParams.Cancel;
        }
    }
    namespace BillingPortal {
        type Configuration = Stripe.BillingPortal.Configuration;
        type ConfigurationCreateParams = Stripe.BillingPortal.ConfigurationCreateParams;
        type ConfigurationRetrieveParams = Stripe.BillingPortal.ConfigurationRetrieveParams;
        type ConfigurationUpdateParams = Stripe.BillingPortal.ConfigurationUpdateParams;
        type ConfigurationListParams = Stripe.BillingPortal.ConfigurationListParams;
        type ConfigurationResource = Stripe.BillingPortal.ConfigurationResource;
        type Session = Stripe.BillingPortal.Session;
        type SessionCreateParams = Stripe.BillingPortal.SessionCreateParams;
        type SessionResource = Stripe.BillingPortal.SessionResource;
        namespace ConfigurationCreateParams {
            type Features = Stripe.BillingPortal.ConfigurationCreateParams.Features;
            type BusinessProfile = Stripe.BillingPortal.ConfigurationCreateParams.BusinessProfile;
            type LoginPage = Stripe.BillingPortal.ConfigurationCreateParams.LoginPage;
        }
        namespace ConfigurationUpdateParams {
            type BusinessProfile = Stripe.BillingPortal.ConfigurationUpdateParams.BusinessProfile;
            type Features = Stripe.BillingPortal.ConfigurationUpdateParams.Features;
            type LoginPage = Stripe.BillingPortal.ConfigurationUpdateParams.LoginPage;
        }
        namespace SessionCreateParams {
            type FlowData = Stripe.BillingPortal.SessionCreateParams.FlowData;
            type Locale = Stripe.BillingPortal.SessionCreateParams.Locale;
        }
    }
    namespace Checkout {
        type Session = Stripe.Checkout.Session;
        type SessionCreateParams = Stripe.Checkout.SessionCreateParams;
        type SessionRetrieveParams = Stripe.Checkout.SessionRetrieveParams;
        type SessionUpdateParams = Stripe.Checkout.SessionUpdateParams;
        type SessionListParams = Stripe.Checkout.SessionListParams;
        type SessionExpireParams = Stripe.Checkout.SessionExpireParams;
        type SessionListLineItemsParams = Stripe.Checkout.SessionListLineItemsParams;
        type SessionResource = Stripe.Checkout.SessionResource;
        namespace SessionCreateParams {
            type AdaptivePricing = Stripe.Checkout.SessionCreateParams.AdaptivePricing;
            type AfterExpiration = Stripe.Checkout.SessionCreateParams.AfterExpiration;
            type AutomaticTax = Stripe.Checkout.SessionCreateParams.AutomaticTax;
            type BillingAddressCollection = Stripe.Checkout.SessionCreateParams.BillingAddressCollection;
            type BrandingSettings = Stripe.Checkout.SessionCreateParams.BrandingSettings;
            type ConsentCollection = Stripe.Checkout.SessionCreateParams.ConsentCollection;
            type CustomField = Stripe.Checkout.SessionCreateParams.CustomField;
            type CustomText = Stripe.Checkout.SessionCreateParams.CustomText;
            type CustomerCreation = Stripe.Checkout.SessionCreateParams.CustomerCreation;
            type CustomerUpdate = Stripe.Checkout.SessionCreateParams.CustomerUpdate;
            type Discount = Stripe.Checkout.SessionCreateParams.Discount;
            type ExcludedPaymentMethodType = Stripe.Checkout.SessionCreateParams.ExcludedPaymentMethodType;
            type InvoiceCreation = Stripe.Checkout.SessionCreateParams.InvoiceCreation;
            type LineItem = Stripe.Checkout.SessionCreateParams.LineItem;
            type Locale = Stripe.Checkout.SessionCreateParams.Locale;
            type ManagedPayments = Stripe.Checkout.SessionCreateParams.ManagedPayments;
            type Mode = Stripe.Checkout.SessionCreateParams.Mode;
            type NameCollection = Stripe.Checkout.SessionCreateParams.NameCollection;
            type OptionalItem = Stripe.Checkout.SessionCreateParams.OptionalItem;
            type OriginContext = Stripe.Checkout.SessionCreateParams.OriginContext;
            type PaymentIntentData = Stripe.Checkout.SessionCreateParams.PaymentIntentData;
            type PaymentMethodCollection = Stripe.Checkout.SessionCreateParams.PaymentMethodCollection;
            type PaymentMethodData = Stripe.Checkout.SessionCreateParams.PaymentMethodData;
            type PaymentMethodOptions = Stripe.Checkout.SessionCreateParams.PaymentMethodOptions;
            type PaymentMethodType = Stripe.Checkout.SessionCreateParams.PaymentMethodType;
            type Permissions = Stripe.Checkout.SessionCreateParams.Permissions;
            type PhoneNumberCollection = Stripe.Checkout.SessionCreateParams.PhoneNumberCollection;
            type RedirectOnCompletion = Stripe.Checkout.SessionCreateParams.RedirectOnCompletion;
            type SavedPaymentMethodOptions = Stripe.Checkout.SessionCreateParams.SavedPaymentMethodOptions;
            type SetupIntentData = Stripe.Checkout.SessionCreateParams.SetupIntentData;
            type ShippingAddressCollection = Stripe.Checkout.SessionCreateParams.ShippingAddressCollection;
            type ShippingOption = Stripe.Checkout.SessionCreateParams.ShippingOption;
            type SubmitType = Stripe.Checkout.SessionCreateParams.SubmitType;
            type SubscriptionData = Stripe.Checkout.SessionCreateParams.SubscriptionData;
            type TaxIdCollection = Stripe.Checkout.SessionCreateParams.TaxIdCollection;
            type UiMode = Stripe.Checkout.SessionCreateParams.UiMode;
            type WalletOptions = Stripe.Checkout.SessionCreateParams.WalletOptions;
        }
        namespace SessionUpdateParams {
            type CollectedInformation = Stripe.Checkout.SessionUpdateParams.CollectedInformation;
            type LineItem = Stripe.Checkout.SessionUpdateParams.LineItem;
            type ShippingOption = Stripe.Checkout.SessionUpdateParams.ShippingOption;
        }
        namespace SessionListParams {
            type CustomerDetails = Stripe.Checkout.SessionListParams.CustomerDetails;
            type Status = Stripe.Checkout.SessionListParams.Status;
        }
    }
    namespace Climate {
        type Order = Stripe.Climate.Order;
        type OrderCreateParams = Stripe.Climate.OrderCreateParams;
        type OrderRetrieveParams = Stripe.Climate.OrderRetrieveParams;
        type OrderUpdateParams = Stripe.Climate.OrderUpdateParams;
        type OrderListParams = Stripe.Climate.OrderListParams;
        type OrderCancelParams = Stripe.Climate.OrderCancelParams;
        type OrderResource = Stripe.Climate.OrderResource;
        type Product = Stripe.Climate.Product;
        type ProductRetrieveParams = Stripe.Climate.ProductRetrieveParams;
        type ProductListParams = Stripe.Climate.ProductListParams;
        type ProductResource = Stripe.Climate.ProductResource;
        type Supplier = Stripe.Climate.Supplier;
        type SupplierRetrieveParams = Stripe.Climate.SupplierRetrieveParams;
        type SupplierListParams = Stripe.Climate.SupplierListParams;
        type SupplierResource = Stripe.Climate.SupplierResource;
        namespace OrderCreateParams {
            type Beneficiary = Stripe.Climate.OrderCreateParams.Beneficiary;
        }
        namespace OrderUpdateParams {
            type Beneficiary = Stripe.Climate.OrderUpdateParams.Beneficiary;
        }
    }
    namespace Entitlements {
        type ActiveEntitlement = Stripe.Entitlements.ActiveEntitlement;
        type ActiveEntitlementRetrieveParams = Stripe.Entitlements.ActiveEntitlementRetrieveParams;
        type ActiveEntitlementListParams = Stripe.Entitlements.ActiveEntitlementListParams;
        type ActiveEntitlementResource = Stripe.Entitlements.ActiveEntitlementResource;
        type Feature = Stripe.Entitlements.Feature;
        type FeatureCreateParams = Stripe.Entitlements.FeatureCreateParams;
        type FeatureRetrieveParams = Stripe.Entitlements.FeatureRetrieveParams;
        type FeatureUpdateParams = Stripe.Entitlements.FeatureUpdateParams;
        type FeatureListParams = Stripe.Entitlements.FeatureListParams;
        type FeatureResource = Stripe.Entitlements.FeatureResource;
        type ActiveEntitlementSummary = Stripe.Entitlements.ActiveEntitlementSummary;
    }
    namespace FinancialConnections {
        type Account = Stripe.FinancialConnections.Account;
        type AccountRetrieveParams = Stripe.FinancialConnections.AccountRetrieveParams;
        type AccountListParams = Stripe.FinancialConnections.AccountListParams;
        type AccountDisconnectParams = Stripe.FinancialConnections.AccountDisconnectParams;
        type AccountListOwnersParams = Stripe.FinancialConnections.AccountListOwnersParams;
        type AccountRefreshParams = Stripe.FinancialConnections.AccountRefreshParams;
        type AccountSubscribeParams = Stripe.FinancialConnections.AccountSubscribeParams;
        type AccountUnsubscribeParams = Stripe.FinancialConnections.AccountUnsubscribeParams;
        type AccountResource = Stripe.FinancialConnections.AccountResource;
        type Session = Stripe.FinancialConnections.Session;
        type SessionCreateParams = Stripe.FinancialConnections.SessionCreateParams;
        type SessionRetrieveParams = Stripe.FinancialConnections.SessionRetrieveParams;
        type SessionResource = Stripe.FinancialConnections.SessionResource;
        type Transaction = Stripe.FinancialConnections.Transaction;
        type TransactionRetrieveParams = Stripe.FinancialConnections.TransactionRetrieveParams;
        type TransactionListParams = Stripe.FinancialConnections.TransactionListParams;
        type TransactionResource = Stripe.FinancialConnections.TransactionResource;
        type AccountOwner = Stripe.FinancialConnections.AccountOwner;
        type AccountOwnership = Stripe.FinancialConnections.AccountOwnership;
        namespace AccountListParams {
            type AccountHolder = Stripe.FinancialConnections.AccountListParams.AccountHolder;
        }
        namespace AccountRefreshParams {
            type Feature = Stripe.FinancialConnections.AccountRefreshParams.Feature;
        }
        namespace SessionCreateParams {
            type AccountHolder = Stripe.FinancialConnections.SessionCreateParams.AccountHolder;
            type Permission = Stripe.FinancialConnections.SessionCreateParams.Permission;
            type Filters = Stripe.FinancialConnections.SessionCreateParams.Filters;
            type Prefetch = Stripe.FinancialConnections.SessionCreateParams.Prefetch;
        }
        namespace TransactionListParams {
            type TransactionRefresh = Stripe.FinancialConnections.TransactionListParams.TransactionRefresh;
        }
    }
    namespace Forwarding {
        type Request = Stripe.Forwarding.Request;
        type RequestCreateParams = Stripe.Forwarding.RequestCreateParams;
        type RequestRetrieveParams = Stripe.Forwarding.RequestRetrieveParams;
        type RequestListParams = Stripe.Forwarding.RequestListParams;
        type RequestResource = Stripe.Forwarding.RequestResource;
        namespace RequestCreateParams {
            type Replacement = Stripe.Forwarding.RequestCreateParams.Replacement;
            type Request = Stripe.Forwarding.RequestCreateParams.Request;
        }
    }
    namespace Identity {
        type VerificationReport = Stripe.Identity.VerificationReport;
        type VerificationReportRetrieveParams = Stripe.Identity.VerificationReportRetrieveParams;
        type VerificationReportListParams = Stripe.Identity.VerificationReportListParams;
        type VerificationReportResource = Stripe.Identity.VerificationReportResource;
        type VerificationSession = Stripe.Identity.VerificationSession;
        type VerificationSessionCreateParams = Stripe.Identity.VerificationSessionCreateParams;
        type VerificationSessionRetrieveParams = Stripe.Identity.VerificationSessionRetrieveParams;
        type VerificationSessionUpdateParams = Stripe.Identity.VerificationSessionUpdateParams;
        type VerificationSessionListParams = Stripe.Identity.VerificationSessionListParams;
        type VerificationSessionCancelParams = Stripe.Identity.VerificationSessionCancelParams;
        type VerificationSessionRedactParams = Stripe.Identity.VerificationSessionRedactParams;
        type VerificationSessionResource = Stripe.Identity.VerificationSessionResource;
        namespace VerificationReportListParams {
            type Type = Stripe.Identity.VerificationReportListParams.Type;
        }
        namespace VerificationSessionCreateParams {
            type Options = Stripe.Identity.VerificationSessionCreateParams.Options;
            type ProvidedDetails = Stripe.Identity.VerificationSessionCreateParams.ProvidedDetails;
            type RelatedPerson = Stripe.Identity.VerificationSessionCreateParams.RelatedPerson;
            type Type = Stripe.Identity.VerificationSessionCreateParams.Type;
        }
        namespace VerificationSessionUpdateParams {
            type Options = Stripe.Identity.VerificationSessionUpdateParams.Options;
            type ProvidedDetails = Stripe.Identity.VerificationSessionUpdateParams.ProvidedDetails;
            type Type = Stripe.Identity.VerificationSessionUpdateParams.Type;
        }
        namespace VerificationSessionListParams {
            type Status = Stripe.Identity.VerificationSessionListParams.Status;
        }
    }
    namespace Issuing {
        type Authorization = Stripe.Issuing.Authorization;
        type AuthorizationRetrieveParams = Stripe.Issuing.AuthorizationRetrieveParams;
        type AuthorizationUpdateParams = Stripe.Issuing.AuthorizationUpdateParams;
        type AuthorizationListParams = Stripe.Issuing.AuthorizationListParams;
        type AuthorizationApproveParams = Stripe.Issuing.AuthorizationApproveParams;
        type AuthorizationDeclineParams = Stripe.Issuing.AuthorizationDeclineParams;
        type AuthorizationResource = Stripe.Issuing.AuthorizationResource;
        type Card = Stripe.Issuing.Card;
        type CardCreateParams = Stripe.Issuing.CardCreateParams;
        type CardRetrieveParams = Stripe.Issuing.CardRetrieveParams;
        type CardUpdateParams = Stripe.Issuing.CardUpdateParams;
        type CardListParams = Stripe.Issuing.CardListParams;
        type CardResource = Stripe.Issuing.CardResource;
        type Cardholder = Stripe.Issuing.Cardholder;
        type CardholderCreateParams = Stripe.Issuing.CardholderCreateParams;
        type CardholderRetrieveParams = Stripe.Issuing.CardholderRetrieveParams;
        type CardholderUpdateParams = Stripe.Issuing.CardholderUpdateParams;
        type CardholderListParams = Stripe.Issuing.CardholderListParams;
        type CardholderResource = Stripe.Issuing.CardholderResource;
        type Dispute = Stripe.Issuing.Dispute;
        type DisputeCreateParams = Stripe.Issuing.DisputeCreateParams;
        type DisputeRetrieveParams = Stripe.Issuing.DisputeRetrieveParams;
        type DisputeUpdateParams = Stripe.Issuing.DisputeUpdateParams;
        type DisputeListParams = Stripe.Issuing.DisputeListParams;
        type DisputeSubmitParams = Stripe.Issuing.DisputeSubmitParams;
        type DisputeResource = Stripe.Issuing.DisputeResource;
        type PersonalizationDesign = Stripe.Issuing.PersonalizationDesign;
        type PersonalizationDesignCreateParams = Stripe.Issuing.PersonalizationDesignCreateParams;
        type PersonalizationDesignRetrieveParams = Stripe.Issuing.PersonalizationDesignRetrieveParams;
        type PersonalizationDesignUpdateParams = Stripe.Issuing.PersonalizationDesignUpdateParams;
        type PersonalizationDesignListParams = Stripe.Issuing.PersonalizationDesignListParams;
        type PersonalizationDesignResource = Stripe.Issuing.PersonalizationDesignResource;
        type PhysicalBundle = Stripe.Issuing.PhysicalBundle;
        type PhysicalBundleRetrieveParams = Stripe.Issuing.PhysicalBundleRetrieveParams;
        type PhysicalBundleListParams = Stripe.Issuing.PhysicalBundleListParams;
        type PhysicalBundleResource = Stripe.Issuing.PhysicalBundleResource;
        type Token = Stripe.Issuing.Token;
        type TokenRetrieveParams = Stripe.Issuing.TokenRetrieveParams;
        type TokenUpdateParams = Stripe.Issuing.TokenUpdateParams;
        type TokenListParams = Stripe.Issuing.TokenListParams;
        type TokenResource = Stripe.Issuing.TokenResource;
        type Transaction = Stripe.Issuing.Transaction;
        type TransactionRetrieveParams = Stripe.Issuing.TransactionRetrieveParams;
        type TransactionUpdateParams = Stripe.Issuing.TransactionUpdateParams;
        type TransactionListParams = Stripe.Issuing.TransactionListParams;
        type TransactionResource = Stripe.Issuing.TransactionResource;
        namespace AuthorizationListParams {
            type Status = Stripe.Issuing.AuthorizationListParams.Status;
        }
        namespace CardCreateParams {
            type Type = Stripe.Issuing.CardCreateParams.Type;
            type LifecycleControls = Stripe.Issuing.CardCreateParams.LifecycleControls;
            type Pin = Stripe.Issuing.CardCreateParams.Pin;
            type ReplacementReason = Stripe.Issuing.CardCreateParams.ReplacementReason;
            type Shipping = Stripe.Issuing.CardCreateParams.Shipping;
            type SpendingControls = Stripe.Issuing.CardCreateParams.SpendingControls;
            type Status = Stripe.Issuing.CardCreateParams.Status;
        }
        namespace CardUpdateParams {
            type CancellationReason = Stripe.Issuing.CardUpdateParams.CancellationReason;
            type Pin = Stripe.Issuing.CardUpdateParams.Pin;
            type Shipping = Stripe.Issuing.CardUpdateParams.Shipping;
            type SpendingControls = Stripe.Issuing.CardUpdateParams.SpendingControls;
            type Status = Stripe.Issuing.CardUpdateParams.Status;
        }
        namespace CardListParams {
            type Status = Stripe.Issuing.CardListParams.Status;
            type Type = Stripe.Issuing.CardListParams.Type;
        }
        namespace CardholderCreateParams {
            type Billing = Stripe.Issuing.CardholderCreateParams.Billing;
            type Company = Stripe.Issuing.CardholderCreateParams.Company;
            type Individual = Stripe.Issuing.CardholderCreateParams.Individual;
            type PreferredLocale = Stripe.Issuing.CardholderCreateParams.PreferredLocale;
            type SpendingControls = Stripe.Issuing.CardholderCreateParams.SpendingControls;
            type Status = Stripe.Issuing.CardholderCreateParams.Status;
            type Type = Stripe.Issuing.CardholderCreateParams.Type;
        }
        namespace CardholderUpdateParams {
            type Billing = Stripe.Issuing.CardholderUpdateParams.Billing;
            type Company = Stripe.Issuing.CardholderUpdateParams.Company;
            type Individual = Stripe.Issuing.CardholderUpdateParams.Individual;
            type PreferredLocale = Stripe.Issuing.CardholderUpdateParams.PreferredLocale;
            type SpendingControls = Stripe.Issuing.CardholderUpdateParams.SpendingControls;
            type Status = Stripe.Issuing.CardholderUpdateParams.Status;
        }
        namespace CardholderListParams {
            type Status = Stripe.Issuing.CardholderListParams.Status;
            type Type = Stripe.Issuing.CardholderListParams.Type;
        }
        namespace DisputeCreateParams {
            type Evidence = Stripe.Issuing.DisputeCreateParams.Evidence;
            type Treasury = Stripe.Issuing.DisputeCreateParams.Treasury;
        }
        namespace DisputeUpdateParams {
            type Evidence = Stripe.Issuing.DisputeUpdateParams.Evidence;
        }
        namespace DisputeListParams {
            type Status = Stripe.Issuing.DisputeListParams.Status;
        }
        namespace PersonalizationDesignCreateParams {
            type CarrierText = Stripe.Issuing.PersonalizationDesignCreateParams.CarrierText;
            type Preferences = Stripe.Issuing.PersonalizationDesignCreateParams.Preferences;
        }
        namespace PersonalizationDesignUpdateParams {
            type CarrierText = Stripe.Issuing.PersonalizationDesignUpdateParams.CarrierText;
            type Preferences = Stripe.Issuing.PersonalizationDesignUpdateParams.Preferences;
        }
        namespace PersonalizationDesignListParams {
            type Preferences = Stripe.Issuing.PersonalizationDesignListParams.Preferences;
            type Status = Stripe.Issuing.PersonalizationDesignListParams.Status;
        }
        namespace PhysicalBundleListParams {
            type Status = Stripe.Issuing.PhysicalBundleListParams.Status;
            type Type = Stripe.Issuing.PhysicalBundleListParams.Type;
        }
        namespace TokenUpdateParams {
            type Status = Stripe.Issuing.TokenUpdateParams.Status;
        }
        namespace TokenListParams {
            type Status = Stripe.Issuing.TokenListParams.Status;
        }
        namespace TransactionListParams {
            type Type = Stripe.Issuing.TransactionListParams.Type;
        }
    }
    namespace Radar {
        type EarlyFraudWarning = Stripe.Radar.EarlyFraudWarning;
        type EarlyFraudWarningRetrieveParams = Stripe.Radar.EarlyFraudWarningRetrieveParams;
        type EarlyFraudWarningListParams = Stripe.Radar.EarlyFraudWarningListParams;
        type EarlyFraudWarningResource = Stripe.Radar.EarlyFraudWarningResource;
        type PaymentEvaluation = Stripe.Radar.PaymentEvaluation;
        type PaymentEvaluationCreateParams = Stripe.Radar.PaymentEvaluationCreateParams;
        type PaymentEvaluationResource = Stripe.Radar.PaymentEvaluationResource;
        type ValueList = Stripe.Radar.ValueList;
        type DeletedValueList = Stripe.Radar.DeletedValueList;
        type ValueListCreateParams = Stripe.Radar.ValueListCreateParams;
        type ValueListRetrieveParams = Stripe.Radar.ValueListRetrieveParams;
        type ValueListUpdateParams = Stripe.Radar.ValueListUpdateParams;
        type ValueListListParams = Stripe.Radar.ValueListListParams;
        type ValueListDeleteParams = Stripe.Radar.ValueListDeleteParams;
        type ValueListResource = Stripe.Radar.ValueListResource;
        type ValueListItem = Stripe.Radar.ValueListItem;
        type DeletedValueListItem = Stripe.Radar.DeletedValueListItem;
        type ValueListItemCreateParams = Stripe.Radar.ValueListItemCreateParams;
        type ValueListItemRetrieveParams = Stripe.Radar.ValueListItemRetrieveParams;
        type ValueListItemListParams = Stripe.Radar.ValueListItemListParams;
        type ValueListItemDeleteParams = Stripe.Radar.ValueListItemDeleteParams;
        type ValueListItemResource = Stripe.Radar.ValueListItemResource;
        namespace PaymentEvaluationCreateParams {
            type CustomerDetails = Stripe.Radar.PaymentEvaluationCreateParams.CustomerDetails;
            type PaymentDetails = Stripe.Radar.PaymentEvaluationCreateParams.PaymentDetails;
            type ClientDeviceMetadataDetails = Stripe.Radar.PaymentEvaluationCreateParams.ClientDeviceMetadataDetails;
        }
        namespace ValueListCreateParams {
            type ItemType = Stripe.Radar.ValueListCreateParams.ItemType;
        }
    }
    namespace Reporting {
        type ReportRun = Stripe.Reporting.ReportRun;
        type ReportRunCreateParams = Stripe.Reporting.ReportRunCreateParams;
        type ReportRunRetrieveParams = Stripe.Reporting.ReportRunRetrieveParams;
        type ReportRunListParams = Stripe.Reporting.ReportRunListParams;
        type ReportRunResource = Stripe.Reporting.ReportRunResource;
        type ReportType = Stripe.Reporting.ReportType;
        type ReportTypeRetrieveParams = Stripe.Reporting.ReportTypeRetrieveParams;
        type ReportTypeListParams = Stripe.Reporting.ReportTypeListParams;
        type ReportTypeResource = Stripe.Reporting.ReportTypeResource;
        namespace ReportRunCreateParams {
            type Parameters = Stripe.Reporting.ReportRunCreateParams.Parameters;
        }
    }
    namespace Sigma {
        type ScheduledQueryRun = Stripe.Sigma.ScheduledQueryRun;
        type ScheduledQueryRunRetrieveParams = Stripe.Sigma.ScheduledQueryRunRetrieveParams;
        type ScheduledQueryRunListParams = Stripe.Sigma.ScheduledQueryRunListParams;
        type ScheduledQueryRunResource = Stripe.Sigma.ScheduledQueryRunResource;
    }
    namespace Tax {
        type Association = Stripe.Tax.Association;
        type AssociationFindParams = Stripe.Tax.AssociationFindParams;
        type AssociationResource = Stripe.Tax.AssociationResource;
        type Calculation = Stripe.Tax.Calculation;
        type CalculationCreateParams = Stripe.Tax.CalculationCreateParams;
        type CalculationRetrieveParams = Stripe.Tax.CalculationRetrieveParams;
        type CalculationListLineItemsParams = Stripe.Tax.CalculationListLineItemsParams;
        type CalculationResource = Stripe.Tax.CalculationResource;
        type Registration = Stripe.Tax.Registration;
        type RegistrationCreateParams = Stripe.Tax.RegistrationCreateParams;
        type RegistrationRetrieveParams = Stripe.Tax.RegistrationRetrieveParams;
        type RegistrationUpdateParams = Stripe.Tax.RegistrationUpdateParams;
        type RegistrationListParams = Stripe.Tax.RegistrationListParams;
        type RegistrationResource = Stripe.Tax.RegistrationResource;
        type Settings = Stripe.Tax.Settings;
        type SettingsRetrieveParams = Stripe.Tax.SettingsRetrieveParams;
        type SettingsUpdateParams = Stripe.Tax.SettingsUpdateParams;
        type SettingResource = Stripe.Tax.SettingResource;
        type Transaction = Stripe.Tax.Transaction;
        type TransactionRetrieveParams = Stripe.Tax.TransactionRetrieveParams;
        type TransactionCreateFromCalculationParams = Stripe.Tax.TransactionCreateFromCalculationParams;
        type TransactionCreateReversalParams = Stripe.Tax.TransactionCreateReversalParams;
        type TransactionListLineItemsParams = Stripe.Tax.TransactionListLineItemsParams;
        type TransactionResource = Stripe.Tax.TransactionResource;
        type CalculationLineItem = Stripe.Tax.CalculationLineItem;
        type TransactionLineItem = Stripe.Tax.TransactionLineItem;
        namespace CalculationCreateParams {
            type LineItem = Stripe.Tax.CalculationCreateParams.LineItem;
            type CustomerDetails = Stripe.Tax.CalculationCreateParams.CustomerDetails;
            type ShipFromDetails = Stripe.Tax.CalculationCreateParams.ShipFromDetails;
            type ShippingCost = Stripe.Tax.CalculationCreateParams.ShippingCost;
        }
        namespace RegistrationCreateParams {
            type CountryOptions = Stripe.Tax.RegistrationCreateParams.CountryOptions;
        }
        namespace RegistrationListParams {
            type Status = Stripe.Tax.RegistrationListParams.Status;
        }
        namespace SettingsUpdateParams {
            type Defaults = Stripe.Tax.SettingsUpdateParams.Defaults;
            type HeadOffice = Stripe.Tax.SettingsUpdateParams.HeadOffice;
        }
        namespace TransactionCreateReversalParams {
            type Mode = Stripe.Tax.TransactionCreateReversalParams.Mode;
            type LineItem = Stripe.Tax.TransactionCreateReversalParams.LineItem;
            type ShippingCost = Stripe.Tax.TransactionCreateReversalParams.ShippingCost;
        }
    }
    namespace Terminal {
        type Configuration = Stripe.Terminal.Configuration;
        type DeletedConfiguration = Stripe.Terminal.DeletedConfiguration;
        type ConfigurationCreateParams = Stripe.Terminal.ConfigurationCreateParams;
        type ConfigurationRetrieveParams = Stripe.Terminal.ConfigurationRetrieveParams;
        type ConfigurationUpdateParams = Stripe.Terminal.ConfigurationUpdateParams;
        type ConfigurationListParams = Stripe.Terminal.ConfigurationListParams;
        type ConfigurationDeleteParams = Stripe.Terminal.ConfigurationDeleteParams;
        type ConfigurationResource = Stripe.Terminal.ConfigurationResource;
        type ConnectionToken = Stripe.Terminal.ConnectionToken;
        type ConnectionTokenCreateParams = Stripe.Terminal.ConnectionTokenCreateParams;
        type ConnectionTokenResource = Stripe.Terminal.ConnectionTokenResource;
        type Location = Stripe.Terminal.Location;
        type DeletedLocation = Stripe.Terminal.DeletedLocation;
        type LocationCreateParams = Stripe.Terminal.LocationCreateParams;
        type LocationRetrieveParams = Stripe.Terminal.LocationRetrieveParams;
        type LocationUpdateParams = Stripe.Terminal.LocationUpdateParams;
        type LocationListParams = Stripe.Terminal.LocationListParams;
        type LocationDeleteParams = Stripe.Terminal.LocationDeleteParams;
        type LocationResource = Stripe.Terminal.LocationResource;
        type OnboardingLink = Stripe.Terminal.OnboardingLink;
        type OnboardingLinkCreateParams = Stripe.Terminal.OnboardingLinkCreateParams;
        type OnboardingLinkResource = Stripe.Terminal.OnboardingLinkResource;
        type Reader = Stripe.Terminal.Reader;
        type DeletedReader = Stripe.Terminal.DeletedReader;
        type ReaderCreateParams = Stripe.Terminal.ReaderCreateParams;
        type ReaderRetrieveParams = Stripe.Terminal.ReaderRetrieveParams;
        type ReaderUpdateParams = Stripe.Terminal.ReaderUpdateParams;
        type ReaderListParams = Stripe.Terminal.ReaderListParams;
        type ReaderDeleteParams = Stripe.Terminal.ReaderDeleteParams;
        type ReaderCancelActionParams = Stripe.Terminal.ReaderCancelActionParams;
        type ReaderCollectInputsParams = Stripe.Terminal.ReaderCollectInputsParams;
        type ReaderCollectPaymentMethodParams = Stripe.Terminal.ReaderCollectPaymentMethodParams;
        type ReaderConfirmPaymentIntentParams = Stripe.Terminal.ReaderConfirmPaymentIntentParams;
        type ReaderProcessPaymentIntentParams = Stripe.Terminal.ReaderProcessPaymentIntentParams;
        type ReaderProcessSetupIntentParams = Stripe.Terminal.ReaderProcessSetupIntentParams;
        type ReaderRefundPaymentParams = Stripe.Terminal.ReaderRefundPaymentParams;
        type ReaderSetReaderDisplayParams = Stripe.Terminal.ReaderSetReaderDisplayParams;
        type ReaderResource = Stripe.Terminal.ReaderResource;
        namespace ConfigurationCreateParams {
            type BbposWisepad3 = Stripe.Terminal.ConfigurationCreateParams.BbposWisepad3;
            type BbposWiseposE = Stripe.Terminal.ConfigurationCreateParams.BbposWiseposE;
            type Cellular = Stripe.Terminal.ConfigurationCreateParams.Cellular;
            type Offline = Stripe.Terminal.ConfigurationCreateParams.Offline;
            type RebootWindow = Stripe.Terminal.ConfigurationCreateParams.RebootWindow;
            type StripeS700 = Stripe.Terminal.ConfigurationCreateParams.StripeS700;
            type StripeS710 = Stripe.Terminal.ConfigurationCreateParams.StripeS710;
            type Tipping = Stripe.Terminal.ConfigurationCreateParams.Tipping;
            type VerifoneM425 = Stripe.Terminal.ConfigurationCreateParams.VerifoneM425;
            type VerifoneP400 = Stripe.Terminal.ConfigurationCreateParams.VerifoneP400;
            type VerifoneP630 = Stripe.Terminal.ConfigurationCreateParams.VerifoneP630;
            type VerifoneUx700 = Stripe.Terminal.ConfigurationCreateParams.VerifoneUx700;
            type VerifoneV660p = Stripe.Terminal.ConfigurationCreateParams.VerifoneV660p;
            type Wifi = Stripe.Terminal.ConfigurationCreateParams.Wifi;
        }
        namespace ConfigurationUpdateParams {
            type BbposWisepad3 = Stripe.Terminal.ConfigurationUpdateParams.BbposWisepad3;
            type BbposWiseposE = Stripe.Terminal.ConfigurationUpdateParams.BbposWiseposE;
            type Cellular = Stripe.Terminal.ConfigurationUpdateParams.Cellular;
            type Offline = Stripe.Terminal.ConfigurationUpdateParams.Offline;
            type RebootWindow = Stripe.Terminal.ConfigurationUpdateParams.RebootWindow;
            type StripeS700 = Stripe.Terminal.ConfigurationUpdateParams.StripeS700;
            type StripeS710 = Stripe.Terminal.ConfigurationUpdateParams.StripeS710;
            type Tipping = Stripe.Terminal.ConfigurationUpdateParams.Tipping;
            type VerifoneM425 = Stripe.Terminal.ConfigurationUpdateParams.VerifoneM425;
            type VerifoneP400 = Stripe.Terminal.ConfigurationUpdateParams.VerifoneP400;
            type VerifoneP630 = Stripe.Terminal.ConfigurationUpdateParams.VerifoneP630;
            type VerifoneUx700 = Stripe.Terminal.ConfigurationUpdateParams.VerifoneUx700;
            type VerifoneV660p = Stripe.Terminal.ConfigurationUpdateParams.VerifoneV660p;
            type Wifi = Stripe.Terminal.ConfigurationUpdateParams.Wifi;
        }
        namespace LocationCreateParams {
            type Address = Stripe.Terminal.LocationCreateParams.Address;
        }
        namespace OnboardingLinkCreateParams {
            type LinkOptions = Stripe.Terminal.OnboardingLinkCreateParams.LinkOptions;
        }
        namespace ReaderListParams {
            type DeviceType = Stripe.Terminal.ReaderListParams.DeviceType;
            type Status = Stripe.Terminal.ReaderListParams.Status;
        }
        namespace ReaderCollectInputsParams {
            type Input = Stripe.Terminal.ReaderCollectInputsParams.Input;
        }
        namespace ReaderCollectPaymentMethodParams {
            type CollectConfig = Stripe.Terminal.ReaderCollectPaymentMethodParams.CollectConfig;
        }
        namespace ReaderConfirmPaymentIntentParams {
            type ConfirmConfig = Stripe.Terminal.ReaderConfirmPaymentIntentParams.ConfirmConfig;
        }
        namespace ReaderProcessPaymentIntentParams {
            type ProcessConfig = Stripe.Terminal.ReaderProcessPaymentIntentParams.ProcessConfig;
        }
        namespace ReaderProcessSetupIntentParams {
            type AllowRedisplay = Stripe.Terminal.ReaderProcessSetupIntentParams.AllowRedisplay;
            type ProcessConfig = Stripe.Terminal.ReaderProcessSetupIntentParams.ProcessConfig;
        }
        namespace ReaderRefundPaymentParams {
            type RefundPaymentConfig = Stripe.Terminal.ReaderRefundPaymentParams.RefundPaymentConfig;
        }
        namespace ReaderSetReaderDisplayParams {
            type Cart = Stripe.Terminal.ReaderSetReaderDisplayParams.Cart;
        }
    }
    namespace TestHelpers {
        type TestClock = Stripe.TestHelpers.TestClock;
        type DeletedTestClock = Stripe.TestHelpers.DeletedTestClock;
        type TestClockCreateParams = Stripe.TestHelpers.TestClockCreateParams;
        type TestClockRetrieveParams = Stripe.TestHelpers.TestClockRetrieveParams;
        type TestClockListParams = Stripe.TestHelpers.TestClockListParams;
        type TestClockDeleteParams = Stripe.TestHelpers.TestClockDeleteParams;
        type TestClockAdvanceParams = Stripe.TestHelpers.TestClockAdvanceParams;
        type TestClockResource = Stripe.TestHelpers.TestClockResource;
    }
    namespace Treasury {
        type CreditReversal = Stripe.Treasury.CreditReversal;
        type CreditReversalCreateParams = Stripe.Treasury.CreditReversalCreateParams;
        type CreditReversalRetrieveParams = Stripe.Treasury.CreditReversalRetrieveParams;
        type CreditReversalListParams = Stripe.Treasury.CreditReversalListParams;
        type CreditReversalResource = Stripe.Treasury.CreditReversalResource;
        type DebitReversal = Stripe.Treasury.DebitReversal;
        type DebitReversalCreateParams = Stripe.Treasury.DebitReversalCreateParams;
        type DebitReversalRetrieveParams = Stripe.Treasury.DebitReversalRetrieveParams;
        type DebitReversalListParams = Stripe.Treasury.DebitReversalListParams;
        type DebitReversalResource = Stripe.Treasury.DebitReversalResource;
        type FinancialAccount = Stripe.Treasury.FinancialAccount;
        type FinancialAccountCreateParams = Stripe.Treasury.FinancialAccountCreateParams;
        type FinancialAccountRetrieveParams = Stripe.Treasury.FinancialAccountRetrieveParams;
        type FinancialAccountUpdateParams = Stripe.Treasury.FinancialAccountUpdateParams;
        type FinancialAccountListParams = Stripe.Treasury.FinancialAccountListParams;
        type FinancialAccountCloseParams = Stripe.Treasury.FinancialAccountCloseParams;
        type FinancialAccountRetrieveFeaturesParams = Stripe.Treasury.FinancialAccountRetrieveFeaturesParams;
        type FinancialAccountUpdateFeaturesParams = Stripe.Treasury.FinancialAccountUpdateFeaturesParams;
        type FinancialAccountResource = Stripe.Treasury.FinancialAccountResource;
        type InboundTransfer = Stripe.Treasury.InboundTransfer;
        type InboundTransferCreateParams = Stripe.Treasury.InboundTransferCreateParams;
        type InboundTransferRetrieveParams = Stripe.Treasury.InboundTransferRetrieveParams;
        type InboundTransferListParams = Stripe.Treasury.InboundTransferListParams;
        type InboundTransferCancelParams = Stripe.Treasury.InboundTransferCancelParams;
        type InboundTransferResource = Stripe.Treasury.InboundTransferResource;
        type OutboundPayment = Stripe.Treasury.OutboundPayment;
        type OutboundPaymentCreateParams = Stripe.Treasury.OutboundPaymentCreateParams;
        type OutboundPaymentRetrieveParams = Stripe.Treasury.OutboundPaymentRetrieveParams;
        type OutboundPaymentListParams = Stripe.Treasury.OutboundPaymentListParams;
        type OutboundPaymentCancelParams = Stripe.Treasury.OutboundPaymentCancelParams;
        type OutboundPaymentResource = Stripe.Treasury.OutboundPaymentResource;
        type OutboundTransfer = Stripe.Treasury.OutboundTransfer;
        type OutboundTransferCreateParams = Stripe.Treasury.OutboundTransferCreateParams;
        type OutboundTransferRetrieveParams = Stripe.Treasury.OutboundTransferRetrieveParams;
        type OutboundTransferListParams = Stripe.Treasury.OutboundTransferListParams;
        type OutboundTransferCancelParams = Stripe.Treasury.OutboundTransferCancelParams;
        type OutboundTransferResource = Stripe.Treasury.OutboundTransferResource;
        type ReceivedCredit = Stripe.Treasury.ReceivedCredit;
        type ReceivedCreditRetrieveParams = Stripe.Treasury.ReceivedCreditRetrieveParams;
        type ReceivedCreditListParams = Stripe.Treasury.ReceivedCreditListParams;
        type ReceivedCreditResource = Stripe.Treasury.ReceivedCreditResource;
        type ReceivedDebit = Stripe.Treasury.ReceivedDebit;
        type ReceivedDebitRetrieveParams = Stripe.Treasury.ReceivedDebitRetrieveParams;
        type ReceivedDebitListParams = Stripe.Treasury.ReceivedDebitListParams;
        type ReceivedDebitResource = Stripe.Treasury.ReceivedDebitResource;
        type Transaction = Stripe.Treasury.Transaction;
        type TransactionRetrieveParams = Stripe.Treasury.TransactionRetrieveParams;
        type TransactionListParams = Stripe.Treasury.TransactionListParams;
        type TransactionResource = Stripe.Treasury.TransactionResource;
        type TransactionEntry = Stripe.Treasury.TransactionEntry;
        type TransactionEntryRetrieveParams = Stripe.Treasury.TransactionEntryRetrieveParams;
        type TransactionEntryListParams = Stripe.Treasury.TransactionEntryListParams;
        type TransactionEntryResource = Stripe.Treasury.TransactionEntryResource;
        type FinancialAccountFeatures = Stripe.Treasury.FinancialAccountFeatures;
        namespace CreditReversalListParams {
            type Status = Stripe.Treasury.CreditReversalListParams.Status;
        }
        namespace DebitReversalListParams {
            type Resolution = Stripe.Treasury.DebitReversalListParams.Resolution;
            type Status = Stripe.Treasury.DebitReversalListParams.Status;
        }
        namespace FinancialAccountCreateParams {
            type Features = Stripe.Treasury.FinancialAccountCreateParams.Features;
            type PlatformRestrictions = Stripe.Treasury.FinancialAccountCreateParams.PlatformRestrictions;
        }
        namespace FinancialAccountUpdateParams {
            type Features = Stripe.Treasury.FinancialAccountUpdateParams.Features;
            type ForwardingSettings = Stripe.Treasury.FinancialAccountUpdateParams.ForwardingSettings;
            type PlatformRestrictions = Stripe.Treasury.FinancialAccountUpdateParams.PlatformRestrictions;
        }
        namespace FinancialAccountListParams {
            type Status = Stripe.Treasury.FinancialAccountListParams.Status;
        }
        namespace FinancialAccountCloseParams {
            type ForwardingSettings = Stripe.Treasury.FinancialAccountCloseParams.ForwardingSettings;
        }
        namespace FinancialAccountUpdateFeaturesParams {
            type CardIssuing = Stripe.Treasury.FinancialAccountUpdateFeaturesParams.CardIssuing;
            type DepositInsurance = Stripe.Treasury.FinancialAccountUpdateFeaturesParams.DepositInsurance;
            type FinancialAddresses = Stripe.Treasury.FinancialAccountUpdateFeaturesParams.FinancialAddresses;
            type InboundTransfers = Stripe.Treasury.FinancialAccountUpdateFeaturesParams.InboundTransfers;
            type IntraStripeFlows = Stripe.Treasury.FinancialAccountUpdateFeaturesParams.IntraStripeFlows;
            type OutboundPayments = Stripe.Treasury.FinancialAccountUpdateFeaturesParams.OutboundPayments;
            type OutboundTransfers = Stripe.Treasury.FinancialAccountUpdateFeaturesParams.OutboundTransfers;
        }
        namespace InboundTransferListParams {
            type Status = Stripe.Treasury.InboundTransferListParams.Status;
        }
        namespace OutboundPaymentCreateParams {
            type DestinationPaymentMethodData = Stripe.Treasury.OutboundPaymentCreateParams.DestinationPaymentMethodData;
            type DestinationPaymentMethodOptions = Stripe.Treasury.OutboundPaymentCreateParams.DestinationPaymentMethodOptions;
            type EndUserDetails = Stripe.Treasury.OutboundPaymentCreateParams.EndUserDetails;
        }
        namespace OutboundPaymentListParams {
            type Status = Stripe.Treasury.OutboundPaymentListParams.Status;
        }
        namespace OutboundTransferCreateParams {
            type DestinationPaymentMethodData = Stripe.Treasury.OutboundTransferCreateParams.DestinationPaymentMethodData;
            type DestinationPaymentMethodOptions = Stripe.Treasury.OutboundTransferCreateParams.DestinationPaymentMethodOptions;
        }
        namespace OutboundTransferListParams {
            type Status = Stripe.Treasury.OutboundTransferListParams.Status;
        }
        namespace ReceivedCreditListParams {
            type LinkedFlows = Stripe.Treasury.ReceivedCreditListParams.LinkedFlows;
            type Status = Stripe.Treasury.ReceivedCreditListParams.Status;
        }
        namespace ReceivedDebitListParams {
            type Status = Stripe.Treasury.ReceivedDebitListParams.Status;
        }
        namespace TransactionListParams {
            type OrderBy = Stripe.Treasury.TransactionListParams.OrderBy;
            type Status = Stripe.Treasury.TransactionListParams.Status;
            type StatusTransitions = Stripe.Treasury.TransactionListParams.StatusTransitions;
        }
        namespace TransactionEntryListParams {
            type OrderBy = Stripe.Treasury.TransactionEntryListParams.OrderBy;
        }
    }
    namespace V2 {
        type DeletedObject = Stripe.V2.DeletedObject;
        namespace Billing {
            type MeterEvent = Stripe.V2.Billing.MeterEvent;
            type MeterEventCreateParams = Stripe.V2.Billing.MeterEventCreateParams;
            type MeterEventResource = Stripe.V2.Billing.MeterEventResource;
            type MeterEventAdjustment = Stripe.V2.Billing.MeterEventAdjustment;
            type MeterEventAdjustmentCreateParams = Stripe.V2.Billing.MeterEventAdjustmentCreateParams;
            type MeterEventAdjustmentResource = Stripe.V2.Billing.MeterEventAdjustmentResource;
            type MeterEventSession = Stripe.V2.Billing.MeterEventSession;
            type MeterEventSessionCreateParams = Stripe.V2.Billing.MeterEventSessionCreateParams;
            type MeterEventSessionResource = Stripe.V2.Billing.MeterEventSessionResource;
            namespace MeterEventAdjustmentCreateParams {
                type Cancel = Stripe.V2.Billing.MeterEventAdjustmentCreateParams.Cancel;
            }
        }
        namespace Core {
            type Account = Stripe.V2.Core.Account;
            type AccountCreateParams = Stripe.V2.Core.AccountCreateParams;
            type AccountRetrieveParams = Stripe.V2.Core.AccountRetrieveParams;
            type AccountUpdateParams = Stripe.V2.Core.AccountUpdateParams;
            type AccountListParams = Stripe.V2.Core.AccountListParams;
            type AccountCloseParams = Stripe.V2.Core.AccountCloseParams;
            type AccountResource = Stripe.V2.Core.AccountResource;
            type AccountLink = Stripe.V2.Core.AccountLink;
            type AccountLinkCreateParams = Stripe.V2.Core.AccountLinkCreateParams;
            type AccountLinkResource = Stripe.V2.Core.AccountLinkResource;
            type AccountToken = Stripe.V2.Core.AccountToken;
            type AccountTokenCreateParams = Stripe.V2.Core.AccountTokenCreateParams;
            type AccountTokenRetrieveParams = Stripe.V2.Core.AccountTokenRetrieveParams;
            type AccountTokenResource = Stripe.V2.Core.AccountTokenResource;
            type Event = Stripe.V2.Core.Event;
            type EventBase = Stripe.V2.Core.EventBase;
            type EventNotification = Stripe.V2.Core.EventNotification;
            type EventRetrieveParams = Stripe.V2.Core.EventRetrieveParams;
            type EventListParams = Stripe.V2.Core.EventListParams;
            type EventResource = Stripe.V2.Core.EventResource;
            type EventDestination = Stripe.V2.Core.EventDestination;
            type EventDestinationCreateParams = Stripe.V2.Core.EventDestinationCreateParams;
            type EventDestinationRetrieveParams = Stripe.V2.Core.EventDestinationRetrieveParams;
            type EventDestinationUpdateParams = Stripe.V2.Core.EventDestinationUpdateParams;
            type EventDestinationListParams = Stripe.V2.Core.EventDestinationListParams;
            type EventDestinationDeleteParams = Stripe.V2.Core.EventDestinationDeleteParams;
            type EventDestinationDisableParams = Stripe.V2.Core.EventDestinationDisableParams;
            type EventDestinationEnableParams = Stripe.V2.Core.EventDestinationEnableParams;
            type EventDestinationPingParams = Stripe.V2.Core.EventDestinationPingParams;
            type EventDestinationResource = Stripe.V2.Core.EventDestinationResource;
            type AccountPersonToken = Stripe.V2.Core.AccountPersonToken;
            type AccountPerson = Stripe.V2.Core.AccountPerson;
            namespace AccountCreateParams {
                type Configuration = Stripe.V2.Core.AccountCreateParams.Configuration;
                type Dashboard = Stripe.V2.Core.AccountCreateParams.Dashboard;
                type Defaults = Stripe.V2.Core.AccountCreateParams.Defaults;
                type Identity = Stripe.V2.Core.AccountCreateParams.Identity;
                type Include = Stripe.V2.Core.AccountCreateParams.Include;
            }
            namespace AccountRetrieveParams {
                type Include = Stripe.V2.Core.AccountRetrieveParams.Include;
            }
            namespace AccountUpdateParams {
                type Configuration = Stripe.V2.Core.AccountUpdateParams.Configuration;
                type Dashboard = Stripe.V2.Core.AccountUpdateParams.Dashboard;
                type Defaults = Stripe.V2.Core.AccountUpdateParams.Defaults;
                type Identity = Stripe.V2.Core.AccountUpdateParams.Identity;
                type Include = Stripe.V2.Core.AccountUpdateParams.Include;
            }
            namespace AccountListParams {
                type AppliedConfiguration = Stripe.V2.Core.AccountListParams.AppliedConfiguration;
            }
            namespace AccountCloseParams {
                type AppliedConfiguration = Stripe.V2.Core.AccountCloseParams.AppliedConfiguration;
            }
            namespace AccountLinkCreateParams {
                type UseCase = Stripe.V2.Core.AccountLinkCreateParams.UseCase;
            }
            namespace AccountTokenCreateParams {
                type Identity = Stripe.V2.Core.AccountTokenCreateParams.Identity;
            }
            namespace EventDestinationCreateParams {
                type EventPayload = Stripe.V2.Core.EventDestinationCreateParams.EventPayload;
                type Type = Stripe.V2.Core.EventDestinationCreateParams.Type;
                type AmazonEventbridge = Stripe.V2.Core.EventDestinationCreateParams.AmazonEventbridge;
                type AzureEventGrid = Stripe.V2.Core.EventDestinationCreateParams.AzureEventGrid;
                type Include = Stripe.V2.Core.EventDestinationCreateParams.Include;
                type WebhookEndpoint = Stripe.V2.Core.EventDestinationCreateParams.WebhookEndpoint;
            }
            namespace EventDestinationUpdateParams {
                type WebhookEndpoint = Stripe.V2.Core.EventDestinationUpdateParams.WebhookEndpoint;
            }
        }
        namespace Commerce {
            type ProductCatalogImport = Stripe.V2.Commerce.ProductCatalogImport;
        }
    }
    namespace Reserve {
        type Hold = Stripe.Reserve.Hold;
        type Plan = Stripe.Reserve.Plan;
        type Release = Stripe.Reserve.Release;
    }
    namespace Events {
        type UnknownEventNotification = Stripe.V2.Core.Events.UnknownEventNotification;
        type V1BillingMeterErrorReportTriggeredEvent = Stripe.V2.Core.Events.V1BillingMeterErrorReportTriggeredEvent;
        type V1BillingMeterErrorReportTriggeredEventNotification = Stripe.V2.Core.Events.V1BillingMeterErrorReportTriggeredEventNotification;
        type V1BillingMeterNoMeterFoundEvent = Stripe.V2.Core.Events.V1BillingMeterNoMeterFoundEvent;
        type V1BillingMeterNoMeterFoundEventNotification = Stripe.V2.Core.Events.V1BillingMeterNoMeterFoundEventNotification;
        type V2CommerceProductCatalogImportsFailedEvent = Stripe.V2.Core.Events.V2CommerceProductCatalogImportsFailedEvent;
        type V2CommerceProductCatalogImportsFailedEventNotification = Stripe.V2.Core.Events.V2CommerceProductCatalogImportsFailedEventNotification;
        type V2CommerceProductCatalogImportsProcessingEvent = Stripe.V2.Core.Events.V2CommerceProductCatalogImportsProcessingEvent;
        type V2CommerceProductCatalogImportsProcessingEventNotification = Stripe.V2.Core.Events.V2CommerceProductCatalogImportsProcessingEventNotification;
        type V2CommerceProductCatalogImportsSucceededEvent = Stripe.V2.Core.Events.V2CommerceProductCatalogImportsSucceededEvent;
        type V2CommerceProductCatalogImportsSucceededEventNotification = Stripe.V2.Core.Events.V2CommerceProductCatalogImportsSucceededEventNotification;
        type V2CommerceProductCatalogImportsSucceededWithErrorsEvent = Stripe.V2.Core.Events.V2CommerceProductCatalogImportsSucceededWithErrorsEvent;
        type V2CommerceProductCatalogImportsSucceededWithErrorsEventNotification = Stripe.V2.Core.Events.V2CommerceProductCatalogImportsSucceededWithErrorsEventNotification;
        type V2CoreAccountClosedEvent = Stripe.V2.Core.Events.V2CoreAccountClosedEvent;
        type V2CoreAccountClosedEventNotification = Stripe.V2.Core.Events.V2CoreAccountClosedEventNotification;
        type V2CoreAccountCreatedEvent = Stripe.V2.Core.Events.V2CoreAccountCreatedEvent;
        type V2CoreAccountCreatedEventNotification = Stripe.V2.Core.Events.V2CoreAccountCreatedEventNotification;
        type V2CoreAccountUpdatedEvent = Stripe.V2.Core.Events.V2CoreAccountUpdatedEvent;
        type V2CoreAccountUpdatedEventNotification = Stripe.V2.Core.Events.V2CoreAccountUpdatedEventNotification;
        type V2CoreAccountIncludingConfigurationCustomerCapabilityStatusUpdatedEvent = Stripe.V2.Core.Events.V2CoreAccountIncludingConfigurationCustomerCapabilityStatusUpdatedEvent;
        type V2CoreAccountIncludingConfigurationCustomerCapabilityStatusUpdatedEventNotification = Stripe.V2.Core.Events.V2CoreAccountIncludingConfigurationCustomerCapabilityStatusUpdatedEventNotification;
        type V2CoreAccountIncludingConfigurationCustomerUpdatedEvent = Stripe.V2.Core.Events.V2CoreAccountIncludingConfigurationCustomerUpdatedEvent;
        type V2CoreAccountIncludingConfigurationCustomerUpdatedEventNotification = Stripe.V2.Core.Events.V2CoreAccountIncludingConfigurationCustomerUpdatedEventNotification;
        type V2CoreAccountIncludingConfigurationMerchantCapabilityStatusUpdatedEvent = Stripe.V2.Core.Events.V2CoreAccountIncludingConfigurationMerchantCapabilityStatusUpdatedEvent;
        type V2CoreAccountIncludingConfigurationMerchantCapabilityStatusUpdatedEventNotification = Stripe.V2.Core.Events.V2CoreAccountIncludingConfigurationMerchantCapabilityStatusUpdatedEventNotification;
        type V2CoreAccountIncludingConfigurationMerchantUpdatedEvent = Stripe.V2.Core.Events.V2CoreAccountIncludingConfigurationMerchantUpdatedEvent;
        type V2CoreAccountIncludingConfigurationMerchantUpdatedEventNotification = Stripe.V2.Core.Events.V2CoreAccountIncludingConfigurationMerchantUpdatedEventNotification;
        type V2CoreAccountIncludingConfigurationRecipientCapabilityStatusUpdatedEvent = Stripe.V2.Core.Events.V2CoreAccountIncludingConfigurationRecipientCapabilityStatusUpdatedEvent;
        type V2CoreAccountIncludingConfigurationRecipientCapabilityStatusUpdatedEventNotification = Stripe.V2.Core.Events.V2CoreAccountIncludingConfigurationRecipientCapabilityStatusUpdatedEventNotification;
        type V2CoreAccountIncludingConfigurationRecipientUpdatedEvent = Stripe.V2.Core.Events.V2CoreAccountIncludingConfigurationRecipientUpdatedEvent;
        type V2CoreAccountIncludingConfigurationRecipientUpdatedEventNotification = Stripe.V2.Core.Events.V2CoreAccountIncludingConfigurationRecipientUpdatedEventNotification;
        type V2CoreAccountIncludingDefaultsUpdatedEvent = Stripe.V2.Core.Events.V2CoreAccountIncludingDefaultsUpdatedEvent;
        type V2CoreAccountIncludingDefaultsUpdatedEventNotification = Stripe.V2.Core.Events.V2CoreAccountIncludingDefaultsUpdatedEventNotification;
        type V2CoreAccountIncludingFutureRequirementsUpdatedEvent = Stripe.V2.Core.Events.V2CoreAccountIncludingFutureRequirementsUpdatedEvent;
        type V2CoreAccountIncludingFutureRequirementsUpdatedEventNotification = Stripe.V2.Core.Events.V2CoreAccountIncludingFutureRequirementsUpdatedEventNotification;
        type V2CoreAccountIncludingIdentityUpdatedEvent = Stripe.V2.Core.Events.V2CoreAccountIncludingIdentityUpdatedEvent;
        type V2CoreAccountIncludingIdentityUpdatedEventNotification = Stripe.V2.Core.Events.V2CoreAccountIncludingIdentityUpdatedEventNotification;
        type V2CoreAccountIncludingRequirementsUpdatedEvent = Stripe.V2.Core.Events.V2CoreAccountIncludingRequirementsUpdatedEvent;
        type V2CoreAccountIncludingRequirementsUpdatedEventNotification = Stripe.V2.Core.Events.V2CoreAccountIncludingRequirementsUpdatedEventNotification;
        type V2CoreAccountLinkReturnedEvent = Stripe.V2.Core.Events.V2CoreAccountLinkReturnedEvent;
        type V2CoreAccountLinkReturnedEventNotification = Stripe.V2.Core.Events.V2CoreAccountLinkReturnedEventNotification;
        type V2CoreAccountPersonCreatedEvent = Stripe.V2.Core.Events.V2CoreAccountPersonCreatedEvent;
        type V2CoreAccountPersonCreatedEventNotification = Stripe.V2.Core.Events.V2CoreAccountPersonCreatedEventNotification;
        type V2CoreAccountPersonDeletedEvent = Stripe.V2.Core.Events.V2CoreAccountPersonDeletedEvent;
        type V2CoreAccountPersonDeletedEventNotification = Stripe.V2.Core.Events.V2CoreAccountPersonDeletedEventNotification;
        type V2CoreAccountPersonUpdatedEvent = Stripe.V2.Core.Events.V2CoreAccountPersonUpdatedEvent;
        type V2CoreAccountPersonUpdatedEventNotification = Stripe.V2.Core.Events.V2CoreAccountPersonUpdatedEventNotification;
        type V2CoreEventDestinationPingEvent = Stripe.V2.Core.Events.V2CoreEventDestinationPingEvent;
        type V2CoreEventDestinationPingEventNotification = Stripe.V2.Core.Events.V2CoreEventDestinationPingEventNotification;
        namespace V1BillingMeterErrorReportTriggeredEvent {
            type Data = Stripe.V2.Core.Events.V1BillingMeterErrorReportTriggeredEvent.Data;
        }
        namespace V1BillingMeterNoMeterFoundEvent {
            type Data = Stripe.V2.Core.Events.V1BillingMeterNoMeterFoundEvent.Data;
        }
        namespace V2CoreAccountIncludingConfigurationCustomerCapabilityStatusUpdatedEvent {
            type Data = Stripe.V2.Core.Events.V2CoreAccountIncludingConfigurationCustomerCapabilityStatusUpdatedEvent.Data;
        }
        namespace V2CoreAccountIncludingConfigurationMerchantCapabilityStatusUpdatedEvent {
            type Data = Stripe.V2.Core.Events.V2CoreAccountIncludingConfigurationMerchantCapabilityStatusUpdatedEvent.Data;
        }
        namespace V2CoreAccountIncludingConfigurationRecipientCapabilityStatusUpdatedEvent {
            type Data = Stripe.V2.Core.Events.V2CoreAccountIncludingConfigurationRecipientCapabilityStatusUpdatedEvent.Data;
        }
        namespace V2CoreAccountLinkReturnedEvent {
            type Data = Stripe.V2.Core.Events.V2CoreAccountLinkReturnedEvent.Data;
        }
        namespace V2CoreAccountPersonCreatedEvent {
            type Data = Stripe.V2.Core.Events.V2CoreAccountPersonCreatedEvent.Data;
        }
        namespace V2CoreAccountPersonDeletedEvent {
            type Data = Stripe.V2.Core.Events.V2CoreAccountPersonDeletedEvent.Data;
        }
        namespace V2CoreAccountPersonUpdatedEvent {
            type Data = Stripe.V2.Core.Events.V2CoreAccountPersonUpdatedEvent.Data;
        }
    }
    type AccountApplicationAuthorizedEvent = Stripe.AccountApplicationAuthorizedEvent;
    type AccountApplicationDeauthorizedEvent = Stripe.AccountApplicationDeauthorizedEvent;
    type AccountExternalAccountCreatedEvent = Stripe.AccountExternalAccountCreatedEvent;
    type AccountExternalAccountDeletedEvent = Stripe.AccountExternalAccountDeletedEvent;
    type AccountExternalAccountUpdatedEvent = Stripe.AccountExternalAccountUpdatedEvent;
    type AccountUpdatedEvent = Stripe.AccountUpdatedEvent;
    type ApplicationFeeCreatedEvent = Stripe.ApplicationFeeCreatedEvent;
    type ApplicationFeeRefundUpdatedEvent = Stripe.ApplicationFeeRefundUpdatedEvent;
    type ApplicationFeeRefundedEvent = Stripe.ApplicationFeeRefundedEvent;
    type BalanceAvailableEvent = Stripe.BalanceAvailableEvent;
    type BalanceSettingsUpdatedEvent = Stripe.BalanceSettingsUpdatedEvent;
    type BillingAlertTriggeredEvent = Stripe.BillingAlertTriggeredEvent;
    type BillingCreditBalanceTransactionCreatedEvent = Stripe.BillingCreditBalanceTransactionCreatedEvent;
    type BillingCreditGrantCreatedEvent = Stripe.BillingCreditGrantCreatedEvent;
    type BillingCreditGrantUpdatedEvent = Stripe.BillingCreditGrantUpdatedEvent;
    type BillingMeterCreatedEvent = Stripe.BillingMeterCreatedEvent;
    type BillingMeterDeactivatedEvent = Stripe.BillingMeterDeactivatedEvent;
    type BillingMeterReactivatedEvent = Stripe.BillingMeterReactivatedEvent;
    type BillingMeterUpdatedEvent = Stripe.BillingMeterUpdatedEvent;
    type BillingPortalConfigurationCreatedEvent = Stripe.BillingPortalConfigurationCreatedEvent;
    type BillingPortalConfigurationUpdatedEvent = Stripe.BillingPortalConfigurationUpdatedEvent;
    type BillingPortalSessionCreatedEvent = Stripe.BillingPortalSessionCreatedEvent;
    type CapabilityUpdatedEvent = Stripe.CapabilityUpdatedEvent;
    type CashBalanceFundsAvailableEvent = Stripe.CashBalanceFundsAvailableEvent;
    type ChargeCapturedEvent = Stripe.ChargeCapturedEvent;
    type ChargeDisputeClosedEvent = Stripe.ChargeDisputeClosedEvent;
    type ChargeDisputeCreatedEvent = Stripe.ChargeDisputeCreatedEvent;
    type ChargeDisputeFundsReinstatedEvent = Stripe.ChargeDisputeFundsReinstatedEvent;
    type ChargeDisputeFundsWithdrawnEvent = Stripe.ChargeDisputeFundsWithdrawnEvent;
    type ChargeDisputeUpdatedEvent = Stripe.ChargeDisputeUpdatedEvent;
    type ChargeExpiredEvent = Stripe.ChargeExpiredEvent;
    type ChargeFailedEvent = Stripe.ChargeFailedEvent;
    type ChargePendingEvent = Stripe.ChargePendingEvent;
    type ChargeRefundUpdatedEvent = Stripe.ChargeRefundUpdatedEvent;
    type ChargeRefundedEvent = Stripe.ChargeRefundedEvent;
    type ChargeSucceededEvent = Stripe.ChargeSucceededEvent;
    type ChargeUpdatedEvent = Stripe.ChargeUpdatedEvent;
    type CheckoutSessionAsyncPaymentFailedEvent = Stripe.CheckoutSessionAsyncPaymentFailedEvent;
    type CheckoutSessionAsyncPaymentSucceededEvent = Stripe.CheckoutSessionAsyncPaymentSucceededEvent;
    type CheckoutSessionCompletedEvent = Stripe.CheckoutSessionCompletedEvent;
    type CheckoutSessionExpiredEvent = Stripe.CheckoutSessionExpiredEvent;
    type ClimateOrderCanceledEvent = Stripe.ClimateOrderCanceledEvent;
    type ClimateOrderCreatedEvent = Stripe.ClimateOrderCreatedEvent;
    type ClimateOrderDelayedEvent = Stripe.ClimateOrderDelayedEvent;
    type ClimateOrderDeliveredEvent = Stripe.ClimateOrderDeliveredEvent;
    type ClimateOrderProductSubstitutedEvent = Stripe.ClimateOrderProductSubstitutedEvent;
    type ClimateProductCreatedEvent = Stripe.ClimateProductCreatedEvent;
    type ClimateProductPricingUpdatedEvent = Stripe.ClimateProductPricingUpdatedEvent;
    type CouponCreatedEvent = Stripe.CouponCreatedEvent;
    type CouponDeletedEvent = Stripe.CouponDeletedEvent;
    type CouponUpdatedEvent = Stripe.CouponUpdatedEvent;
    type CreditNoteCreatedEvent = Stripe.CreditNoteCreatedEvent;
    type CreditNoteUpdatedEvent = Stripe.CreditNoteUpdatedEvent;
    type CreditNoteVoidedEvent = Stripe.CreditNoteVoidedEvent;
    type CustomerCreatedEvent = Stripe.CustomerCreatedEvent;
    type CustomerDeletedEvent = Stripe.CustomerDeletedEvent;
    type CustomerDiscountCreatedEvent = Stripe.CustomerDiscountCreatedEvent;
    type CustomerDiscountDeletedEvent = Stripe.CustomerDiscountDeletedEvent;
    type CustomerDiscountUpdatedEvent = Stripe.CustomerDiscountUpdatedEvent;
    type CustomerSourceCreatedEvent = Stripe.CustomerSourceCreatedEvent;
    type CustomerSourceDeletedEvent = Stripe.CustomerSourceDeletedEvent;
    type CustomerSourceExpiringEvent = Stripe.CustomerSourceExpiringEvent;
    type CustomerSourceUpdatedEvent = Stripe.CustomerSourceUpdatedEvent;
    type CustomerSubscriptionCreatedEvent = Stripe.CustomerSubscriptionCreatedEvent;
    type CustomerSubscriptionDeletedEvent = Stripe.CustomerSubscriptionDeletedEvent;
    type CustomerSubscriptionPausedEvent = Stripe.CustomerSubscriptionPausedEvent;
    type CustomerSubscriptionPendingUpdateAppliedEvent = Stripe.CustomerSubscriptionPendingUpdateAppliedEvent;
    type CustomerSubscriptionPendingUpdateExpiredEvent = Stripe.CustomerSubscriptionPendingUpdateExpiredEvent;
    type CustomerSubscriptionResumedEvent = Stripe.CustomerSubscriptionResumedEvent;
    type CustomerSubscriptionTrialWillEndEvent = Stripe.CustomerSubscriptionTrialWillEndEvent;
    type CustomerSubscriptionUpdatedEvent = Stripe.CustomerSubscriptionUpdatedEvent;
    type CustomerTaxIdCreatedEvent = Stripe.CustomerTaxIdCreatedEvent;
    type CustomerTaxIdDeletedEvent = Stripe.CustomerTaxIdDeletedEvent;
    type CustomerTaxIdUpdatedEvent = Stripe.CustomerTaxIdUpdatedEvent;
    type CustomerUpdatedEvent = Stripe.CustomerUpdatedEvent;
    type CustomerCashBalanceTransactionCreatedEvent = Stripe.CustomerCashBalanceTransactionCreatedEvent;
    type EntitlementsActiveEntitlementSummaryUpdatedEvent = Stripe.EntitlementsActiveEntitlementSummaryUpdatedEvent;
    type FileCreatedEvent = Stripe.FileCreatedEvent;
    type FinancialConnectionsAccountAccountNumbersUpdatedEvent = Stripe.FinancialConnectionsAccountAccountNumbersUpdatedEvent;
    type FinancialConnectionsAccountCreatedEvent = Stripe.FinancialConnectionsAccountCreatedEvent;
    type FinancialConnectionsAccountDeactivatedEvent = Stripe.FinancialConnectionsAccountDeactivatedEvent;
    type FinancialConnectionsAccountDisconnectedEvent = Stripe.FinancialConnectionsAccountDisconnectedEvent;
    type FinancialConnectionsAccountReactivatedEvent = Stripe.FinancialConnectionsAccountReactivatedEvent;
    type FinancialConnectionsAccountRefreshedBalanceEvent = Stripe.FinancialConnectionsAccountRefreshedBalanceEvent;
    type FinancialConnectionsAccountRefreshedOwnershipEvent = Stripe.FinancialConnectionsAccountRefreshedOwnershipEvent;
    type FinancialConnectionsAccountRefreshedTransactionsEvent = Stripe.FinancialConnectionsAccountRefreshedTransactionsEvent;
    type FinancialConnectionsAccountUpcomingAccountNumberExpiryEvent = Stripe.FinancialConnectionsAccountUpcomingAccountNumberExpiryEvent;
    type IdentityVerificationSessionCanceledEvent = Stripe.IdentityVerificationSessionCanceledEvent;
    type IdentityVerificationSessionCreatedEvent = Stripe.IdentityVerificationSessionCreatedEvent;
    type IdentityVerificationSessionProcessingEvent = Stripe.IdentityVerificationSessionProcessingEvent;
    type IdentityVerificationSessionRedactedEvent = Stripe.IdentityVerificationSessionRedactedEvent;
    type IdentityVerificationSessionRequiresInputEvent = Stripe.IdentityVerificationSessionRequiresInputEvent;
    type IdentityVerificationSessionVerifiedEvent = Stripe.IdentityVerificationSessionVerifiedEvent;
    type InvoiceCreatedEvent = Stripe.InvoiceCreatedEvent;
    type InvoiceDeletedEvent = Stripe.InvoiceDeletedEvent;
    type InvoiceFinalizationFailedEvent = Stripe.InvoiceFinalizationFailedEvent;
    type InvoiceFinalizedEvent = Stripe.InvoiceFinalizedEvent;
    type InvoiceMarkedUncollectibleEvent = Stripe.InvoiceMarkedUncollectibleEvent;
    type InvoiceOverdueEvent = Stripe.InvoiceOverdueEvent;
    type InvoiceOverpaidEvent = Stripe.InvoiceOverpaidEvent;
    type InvoicePaidEvent = Stripe.InvoicePaidEvent;
    type InvoicePaymentActionRequiredEvent = Stripe.InvoicePaymentActionRequiredEvent;
    type InvoicePaymentAttemptRequiredEvent = Stripe.InvoicePaymentAttemptRequiredEvent;
    type InvoicePaymentFailedEvent = Stripe.InvoicePaymentFailedEvent;
    type InvoicePaymentSucceededEvent = Stripe.InvoicePaymentSucceededEvent;
    type InvoiceSentEvent = Stripe.InvoiceSentEvent;
    type InvoiceUpcomingEvent = Stripe.InvoiceUpcomingEvent;
    type InvoiceUpdatedEvent = Stripe.InvoiceUpdatedEvent;
    type InvoiceVoidedEvent = Stripe.InvoiceVoidedEvent;
    type InvoiceWillBeDueEvent = Stripe.InvoiceWillBeDueEvent;
    type InvoicePaymentPaidEvent = Stripe.InvoicePaymentPaidEvent;
    type InvoiceItemCreatedEvent = Stripe.InvoiceItemCreatedEvent;
    type InvoiceItemDeletedEvent = Stripe.InvoiceItemDeletedEvent;
    type IssuingAuthorizationCreatedEvent = Stripe.IssuingAuthorizationCreatedEvent;
    type IssuingAuthorizationRequestEvent = Stripe.IssuingAuthorizationRequestEvent;
    type IssuingAuthorizationUpdatedEvent = Stripe.IssuingAuthorizationUpdatedEvent;
    type IssuingCardCreatedEvent = Stripe.IssuingCardCreatedEvent;
    type IssuingCardUpdatedEvent = Stripe.IssuingCardUpdatedEvent;
    type IssuingCardholderCreatedEvent = Stripe.IssuingCardholderCreatedEvent;
    type IssuingCardholderUpdatedEvent = Stripe.IssuingCardholderUpdatedEvent;
    type IssuingDisputeClosedEvent = Stripe.IssuingDisputeClosedEvent;
    type IssuingDisputeCreatedEvent = Stripe.IssuingDisputeCreatedEvent;
    type IssuingDisputeFundsReinstatedEvent = Stripe.IssuingDisputeFundsReinstatedEvent;
    type IssuingDisputeFundsRescindedEvent = Stripe.IssuingDisputeFundsRescindedEvent;
    type IssuingDisputeSubmittedEvent = Stripe.IssuingDisputeSubmittedEvent;
    type IssuingDisputeUpdatedEvent = Stripe.IssuingDisputeUpdatedEvent;
    type IssuingPersonalizationDesignActivatedEvent = Stripe.IssuingPersonalizationDesignActivatedEvent;
    type IssuingPersonalizationDesignDeactivatedEvent = Stripe.IssuingPersonalizationDesignDeactivatedEvent;
    type IssuingPersonalizationDesignRejectedEvent = Stripe.IssuingPersonalizationDesignRejectedEvent;
    type IssuingPersonalizationDesignUpdatedEvent = Stripe.IssuingPersonalizationDesignUpdatedEvent;
    type IssuingTokenCreatedEvent = Stripe.IssuingTokenCreatedEvent;
    type IssuingTokenUpdatedEvent = Stripe.IssuingTokenUpdatedEvent;
    type IssuingTransactionCreatedEvent = Stripe.IssuingTransactionCreatedEvent;
    type IssuingTransactionPurchaseDetailsReceiptUpdatedEvent = Stripe.IssuingTransactionPurchaseDetailsReceiptUpdatedEvent;
    type IssuingTransactionUpdatedEvent = Stripe.IssuingTransactionUpdatedEvent;
    type MandateUpdatedEvent = Stripe.MandateUpdatedEvent;
    type PaymentIntentAmountCapturableUpdatedEvent = Stripe.PaymentIntentAmountCapturableUpdatedEvent;
    type PaymentIntentCanceledEvent = Stripe.PaymentIntentCanceledEvent;
    type PaymentIntentCreatedEvent = Stripe.PaymentIntentCreatedEvent;
    type PaymentIntentPartiallyFundedEvent = Stripe.PaymentIntentPartiallyFundedEvent;
    type PaymentIntentPaymentFailedEvent = Stripe.PaymentIntentPaymentFailedEvent;
    type PaymentIntentProcessingEvent = Stripe.PaymentIntentProcessingEvent;
    type PaymentIntentRequiresActionEvent = Stripe.PaymentIntentRequiresActionEvent;
    type PaymentIntentSucceededEvent = Stripe.PaymentIntentSucceededEvent;
    type PaymentLinkCreatedEvent = Stripe.PaymentLinkCreatedEvent;
    type PaymentLinkUpdatedEvent = Stripe.PaymentLinkUpdatedEvent;
    type PaymentMethodAttachedEvent = Stripe.PaymentMethodAttachedEvent;
    type PaymentMethodAutomaticallyUpdatedEvent = Stripe.PaymentMethodAutomaticallyUpdatedEvent;
    type PaymentMethodDetachedEvent = Stripe.PaymentMethodDetachedEvent;
    type PaymentMethodUpdatedEvent = Stripe.PaymentMethodUpdatedEvent;
    type PayoutCanceledEvent = Stripe.PayoutCanceledEvent;
    type PayoutCreatedEvent = Stripe.PayoutCreatedEvent;
    type PayoutFailedEvent = Stripe.PayoutFailedEvent;
    type PayoutPaidEvent = Stripe.PayoutPaidEvent;
    type PayoutReconciliationCompletedEvent = Stripe.PayoutReconciliationCompletedEvent;
    type PayoutUpdatedEvent = Stripe.PayoutUpdatedEvent;
    type PersonCreatedEvent = Stripe.PersonCreatedEvent;
    type PersonDeletedEvent = Stripe.PersonDeletedEvent;
    type PersonUpdatedEvent = Stripe.PersonUpdatedEvent;
    type PlanCreatedEvent = Stripe.PlanCreatedEvent;
    type PlanDeletedEvent = Stripe.PlanDeletedEvent;
    type PlanUpdatedEvent = Stripe.PlanUpdatedEvent;
    type PriceCreatedEvent = Stripe.PriceCreatedEvent;
    type PriceDeletedEvent = Stripe.PriceDeletedEvent;
    type PriceUpdatedEvent = Stripe.PriceUpdatedEvent;
    type ProductCreatedEvent = Stripe.ProductCreatedEvent;
    type ProductDeletedEvent = Stripe.ProductDeletedEvent;
    type ProductUpdatedEvent = Stripe.ProductUpdatedEvent;
    type PromotionCodeCreatedEvent = Stripe.PromotionCodeCreatedEvent;
    type PromotionCodeUpdatedEvent = Stripe.PromotionCodeUpdatedEvent;
    type QuoteAcceptedEvent = Stripe.QuoteAcceptedEvent;
    type QuoteCanceledEvent = Stripe.QuoteCanceledEvent;
    type QuoteCreatedEvent = Stripe.QuoteCreatedEvent;
    type QuoteFinalizedEvent = Stripe.QuoteFinalizedEvent;
    type RadarEarlyFraudWarningCreatedEvent = Stripe.RadarEarlyFraudWarningCreatedEvent;
    type RadarEarlyFraudWarningUpdatedEvent = Stripe.RadarEarlyFraudWarningUpdatedEvent;
    type RefundCreatedEvent = Stripe.RefundCreatedEvent;
    type RefundFailedEvent = Stripe.RefundFailedEvent;
    type RefundUpdatedEvent = Stripe.RefundUpdatedEvent;
    type ReportingReportRunFailedEvent = Stripe.ReportingReportRunFailedEvent;
    type ReportingReportRunSucceededEvent = Stripe.ReportingReportRunSucceededEvent;
    type ReportingReportTypeUpdatedEvent = Stripe.ReportingReportTypeUpdatedEvent;
    type ReserveHoldCreatedEvent = Stripe.ReserveHoldCreatedEvent;
    type ReserveHoldUpdatedEvent = Stripe.ReserveHoldUpdatedEvent;
    type ReservePlanCreatedEvent = Stripe.ReservePlanCreatedEvent;
    type ReservePlanDisabledEvent = Stripe.ReservePlanDisabledEvent;
    type ReservePlanExpiredEvent = Stripe.ReservePlanExpiredEvent;
    type ReservePlanUpdatedEvent = Stripe.ReservePlanUpdatedEvent;
    type ReserveReleaseCreatedEvent = Stripe.ReserveReleaseCreatedEvent;
    type ReviewClosedEvent = Stripe.ReviewClosedEvent;
    type ReviewOpenedEvent = Stripe.ReviewOpenedEvent;
    type SetupIntentCanceledEvent = Stripe.SetupIntentCanceledEvent;
    type SetupIntentCreatedEvent = Stripe.SetupIntentCreatedEvent;
    type SetupIntentRequiresActionEvent = Stripe.SetupIntentRequiresActionEvent;
    type SetupIntentSetupFailedEvent = Stripe.SetupIntentSetupFailedEvent;
    type SetupIntentSucceededEvent = Stripe.SetupIntentSucceededEvent;
    type SigmaScheduledQueryRunCreatedEvent = Stripe.SigmaScheduledQueryRunCreatedEvent;
    type SourceCanceledEvent = Stripe.SourceCanceledEvent;
    type SourceChargeableEvent = Stripe.SourceChargeableEvent;
    type SourceFailedEvent = Stripe.SourceFailedEvent;
    type SourceMandateNotificationEvent = Stripe.SourceMandateNotificationEvent;
    type SourceRefundAttributesRequiredEvent = Stripe.SourceRefundAttributesRequiredEvent;
    type SourceTransactionCreatedEvent = Stripe.SourceTransactionCreatedEvent;
    type SourceTransactionUpdatedEvent = Stripe.SourceTransactionUpdatedEvent;
    type SubscriptionScheduleAbortedEvent = Stripe.SubscriptionScheduleAbortedEvent;
    type SubscriptionScheduleCanceledEvent = Stripe.SubscriptionScheduleCanceledEvent;
    type SubscriptionScheduleCompletedEvent = Stripe.SubscriptionScheduleCompletedEvent;
    type SubscriptionScheduleCreatedEvent = Stripe.SubscriptionScheduleCreatedEvent;
    type SubscriptionScheduleExpiringEvent = Stripe.SubscriptionScheduleExpiringEvent;
    type SubscriptionScheduleReleasedEvent = Stripe.SubscriptionScheduleReleasedEvent;
    type SubscriptionScheduleUpdatedEvent = Stripe.SubscriptionScheduleUpdatedEvent;
    type TaxSettingsUpdatedEvent = Stripe.TaxSettingsUpdatedEvent;
    type TaxRateCreatedEvent = Stripe.TaxRateCreatedEvent;
    type TaxRateUpdatedEvent = Stripe.TaxRateUpdatedEvent;
    type TerminalReaderActionFailedEvent = Stripe.TerminalReaderActionFailedEvent;
    type TerminalReaderActionSucceededEvent = Stripe.TerminalReaderActionSucceededEvent;
    type TerminalReaderActionUpdatedEvent = Stripe.TerminalReaderActionUpdatedEvent;
    type TestHelpersTestClockAdvancingEvent = Stripe.TestHelpersTestClockAdvancingEvent;
    type TestHelpersTestClockCreatedEvent = Stripe.TestHelpersTestClockCreatedEvent;
    type TestHelpersTestClockDeletedEvent = Stripe.TestHelpersTestClockDeletedEvent;
    type TestHelpersTestClockInternalFailureEvent = Stripe.TestHelpersTestClockInternalFailureEvent;
    type TestHelpersTestClockReadyEvent = Stripe.TestHelpersTestClockReadyEvent;
    type TopupCanceledEvent = Stripe.TopupCanceledEvent;
    type TopupCreatedEvent = Stripe.TopupCreatedEvent;
    type TopupFailedEvent = Stripe.TopupFailedEvent;
    type TopupReversedEvent = Stripe.TopupReversedEvent;
    type TopupSucceededEvent = Stripe.TopupSucceededEvent;
    type TransferCreatedEvent = Stripe.TransferCreatedEvent;
    type TransferReversedEvent = Stripe.TransferReversedEvent;
    type TransferUpdatedEvent = Stripe.TransferUpdatedEvent;
    type TreasuryCreditReversalCreatedEvent = Stripe.TreasuryCreditReversalCreatedEvent;
    type TreasuryCreditReversalPostedEvent = Stripe.TreasuryCreditReversalPostedEvent;
    type TreasuryDebitReversalCompletedEvent = Stripe.TreasuryDebitReversalCompletedEvent;
    type TreasuryDebitReversalCreatedEvent = Stripe.TreasuryDebitReversalCreatedEvent;
    type TreasuryDebitReversalInitialCreditGrantedEvent = Stripe.TreasuryDebitReversalInitialCreditGrantedEvent;
    type TreasuryFinancialAccountClosedEvent = Stripe.TreasuryFinancialAccountClosedEvent;
    type TreasuryFinancialAccountCreatedEvent = Stripe.TreasuryFinancialAccountCreatedEvent;
    type TreasuryFinancialAccountFeaturesStatusUpdatedEvent = Stripe.TreasuryFinancialAccountFeaturesStatusUpdatedEvent;
    type TreasuryInboundTransferCanceledEvent = Stripe.TreasuryInboundTransferCanceledEvent;
    type TreasuryInboundTransferCreatedEvent = Stripe.TreasuryInboundTransferCreatedEvent;
    type TreasuryInboundTransferFailedEvent = Stripe.TreasuryInboundTransferFailedEvent;
    type TreasuryInboundTransferSucceededEvent = Stripe.TreasuryInboundTransferSucceededEvent;
    type TreasuryOutboundPaymentCanceledEvent = Stripe.TreasuryOutboundPaymentCanceledEvent;
    type TreasuryOutboundPaymentCreatedEvent = Stripe.TreasuryOutboundPaymentCreatedEvent;
    type TreasuryOutboundPaymentExpectedArrivalDateUpdatedEvent = Stripe.TreasuryOutboundPaymentExpectedArrivalDateUpdatedEvent;
    type TreasuryOutboundPaymentFailedEvent = Stripe.TreasuryOutboundPaymentFailedEvent;
    type TreasuryOutboundPaymentPostedEvent = Stripe.TreasuryOutboundPaymentPostedEvent;
    type TreasuryOutboundPaymentReturnedEvent = Stripe.TreasuryOutboundPaymentReturnedEvent;
    type TreasuryOutboundPaymentTrackingDetailsUpdatedEvent = Stripe.TreasuryOutboundPaymentTrackingDetailsUpdatedEvent;
    type TreasuryOutboundTransferCanceledEvent = Stripe.TreasuryOutboundTransferCanceledEvent;
    type TreasuryOutboundTransferCreatedEvent = Stripe.TreasuryOutboundTransferCreatedEvent;
    type TreasuryOutboundTransferExpectedArrivalDateUpdatedEvent = Stripe.TreasuryOutboundTransferExpectedArrivalDateUpdatedEvent;
    type TreasuryOutboundTransferFailedEvent = Stripe.TreasuryOutboundTransferFailedEvent;
    type TreasuryOutboundTransferPostedEvent = Stripe.TreasuryOutboundTransferPostedEvent;
    type TreasuryOutboundTransferReturnedEvent = Stripe.TreasuryOutboundTransferReturnedEvent;
    type TreasuryOutboundTransferTrackingDetailsUpdatedEvent = Stripe.TreasuryOutboundTransferTrackingDetailsUpdatedEvent;
    type TreasuryReceivedCreditCreatedEvent = Stripe.TreasuryReceivedCreditCreatedEvent;
    type TreasuryReceivedCreditFailedEvent = Stripe.TreasuryReceivedCreditFailedEvent;
    type TreasuryReceivedCreditSucceededEvent = Stripe.TreasuryReceivedCreditSucceededEvent;
    type TreasuryReceivedDebitCreatedEvent = Stripe.TreasuryReceivedDebitCreatedEvent;
    type V2List<T> = Stripe.V2List<T>;
    type V2ListPromise<T> = Stripe.V2ListPromise<T>;
    type Response<T> = Stripe.Response<T>;
    type RequestOptions = Stripe.RequestOptions;
    type RawRequestOptions = Stripe.RawRequestOptions;
    type ApiList<T> = Stripe.ApiList<T>;
    type ApiListPromise<T> = Stripe.ApiListPromise<T>;
    type ApiSearchResultPromise<T> = Stripe.ApiSearchResultPromise<T>;
    type ApiSearchResult<T> = Stripe.ApiSearchResult<T>;
    type StripeStreamResponse = Stripe.StripeStreamResponse;
    type RequestEvent = Stripe.RequestEvent;
    type ResponseEvent = Stripe.ResponseEvent;
    type AppInfo = Stripe.AppInfo;
    type FileData = Stripe.FileData;
    type Metadata = Stripe.Metadata;
    type MetadataParam = Stripe.MetadataParam;
    type Address = Stripe.Address;
    type JapanAddress = Stripe.JapanAddress;
    type AddressParam = Stripe.AddressParam;
    type ShippingAddressParam = Stripe.ShippingAddressParam;
    type JapanAddressParam = Stripe.JapanAddressParam;
    type RangeQueryParam = Stripe.RangeQueryParam;
    type PaginationParams = Stripe.PaginationParams;
    type Emptyable<T> = Stripe.Emptyable<T>;
    type OAuthResource = Stripe.OAuthResource;
    type OAuthToken = Stripe.OAuthToken;
    type OAuthTokenParams = Stripe.OAuthTokenParams;
    type OAuthAuthorizeUrlOptions = Stripe.OAuthAuthorizeUrlOptions;
    type OAuthAuthorizeUrlParams = Stripe.OAuthAuthorizeUrlParams;
    type OAuthDeauthorization = Stripe.OAuthDeauthorization;
    type OAuthDeauthorizeParams = Stripe.OAuthDeauthorizeParams;
    type StripeContextType = Stripe.StripeContextType;
    type StripeRawError = Stripe.StripeRawError;
    type Decimal = Stripe.Decimal;
    namespace errors {
        type StripeError = InstanceType<typeof Stripe.errors.StripeError>;
        type StripeCardError = InstanceType<typeof Stripe.errors.StripeCardError>;
        type StripeInvalidRequestError = InstanceType<typeof Stripe.errors.StripeInvalidRequestError>;
        type StripeAPIError = InstanceType<typeof Stripe.errors.StripeAPIError>;
        type StripeAuthenticationError = InstanceType<typeof Stripe.errors.StripeAuthenticationError>;
        type StripePermissionError = InstanceType<typeof Stripe.errors.StripePermissionError>;
        type StripeRateLimitError = InstanceType<typeof Stripe.errors.StripeRateLimitError>;
        type StripeConnectionError = InstanceType<typeof Stripe.errors.StripeConnectionError>;
        type StripeSignatureVerificationError = InstanceType<typeof Stripe.errors.StripeSignatureVerificationError>;
        type StripeIdempotencyError = InstanceType<typeof Stripe.errors.StripeIdempotencyError>;
        type StripeInvalidGrantError = InstanceType<typeof Stripe.errors.StripeInvalidGrantError>;
    }
}
export = StripeConstructor;
