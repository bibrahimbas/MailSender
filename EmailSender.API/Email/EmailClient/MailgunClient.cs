using EmailSender.API.Config;
using EmailSender.API.Http;
using Microsoft.Extensions.Options;

namespace EmailSender.API.Email.EmailClient
{
    public class MailgunClient : IEmailClient
    {
        private readonly IHttpClient _httpClient;
        private readonly MailGunConfiguration _config;

        public MailgunClient(IHttpClient httpClient, IOptions<EmailConfiguration> config)
        {
            _httpClient = httpClient;
            _config = config.Value.MailGun;
        }
        public EmailResult Send(EmailMessage message)
        {
            var headers = new HttpHeaderCollection()
            {
                new HttpHeader { Key = "Authorization", Value = string.Format("Basic {0}", _config.ApiKey) }
            };
            var formDataBuilder = new HttpFormDataBuilder()
                .AddFormData("domain", _config.Domain)
                .AddFormData("from", message.From)
                .AddFormData("subject", message.Subject)
                .AddFormData("text", message.Message);

            if (message.To != null)
            {
                foreach (var to in message.To)
                {
                    formDataBuilder.AddFormData("to", to);
                }
            }
            if (message.Cc != null)
            {
                foreach (var cc in message.Cc)
                {
                    formDataBuilder.AddFormData("cc", cc);
                }
            }
            if (message.Bcc != null)
            {
                foreach (var bcc in message.Bcc)
                {
                    formDataBuilder.AddFormData("bcc", bcc);
                }
            }

            HttpResponse response = _httpClient.PostAsync(string.Format("{0}/{1}/messages", _config.BaseUrl, _config.Domain), headers, formDataBuilder.Build());

            return new EmailResult { StatusCode = response.StatusCode };
        }
    }
}
