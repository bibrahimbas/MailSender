using EmailSender.API.Config;
using EmailSender.API.Email.Models;
using EmailSender.API.Http;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Collections.Generic;
using System.Linq;

namespace EmailSender.API.Email.EmailClient
{
    public class SendGridClient : IEmailClient
    {
        private readonly IHttpClient _httpClient;
        private readonly SendGridConfiguration _config;

        public SendGridClient(IHttpClient httpClient, IOptions<EmailConfiguration> config)
        {
            _httpClient = httpClient;
            _config = config.Value.SendGrid;
        }

        public EmailResult Send(EmailMessage message)
        {
            var headers = new HttpHeaderCollection()
            {
                new HttpHeader { Key = "Authorization", Value = string.Format("Bearer {0}", _config.ApiKey) },
                new HttpHeader { Key = "Content-Type", Value = "application/json" }
            };

            var request = MapToRequest(message);
            HttpResponse response = _httpClient.PostAsync(_config.BaseUrl, headers, HttpJsonDataParser.Serialize(request));

            return new EmailResult { StatusCode = response.StatusCode };
        }

        private SendGridRequest MapToRequest(EmailMessage message)
        {
            return new SendGridRequest()
            {
                Personalizations = new List<SendGridRequest.Personalization>()
                {
                    new SendGridRequest.Personalization()
                    {
                        To = message.To?.Select(x => new SendGridRequest.EmailRecepient { Email = x }),
                        Cc = message.Cc?.Select(x => new SendGridRequest.EmailRecepient { Email = x }),
                        Bcc = message.Bcc?.Select(x => new SendGridRequest.EmailRecepient { Email = x })
                    }
                },
                Subject = message.Subject,
                From = new SendGridRequest.EmailRecepient()
                {
                    Email = message.From
                },
                Content = new List<SendGridRequest.EmailContent>()
                {
                    new SendGridRequest.EmailContent()
                    {
                        Type = "text/plain",
                        Value = message.Message
                    }
                }
            };
        }
    }
}
