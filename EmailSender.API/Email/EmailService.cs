using EmailSender.API.Email.EmailClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmailSender.API.Email
{
    public class EmailService : IEmailService
    {
        IEnumerable<IEmailClient> _emailClients;
        
        public EmailService(IEnumerable<IEmailClient> emailClients)
        {
            _emailClients = emailClients;
        }

        public void Send(EmailMessage message)
        {
            var statusCode = 0;

            foreach(var emailClient in _emailClients)
            {
                statusCode = emailClient.Send(message).StatusCode;
                if (statusCode >= 200 && statusCode < 300)
                    break;
            }
        }
    }
}
