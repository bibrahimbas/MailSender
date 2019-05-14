using Newtonsoft.Json;
using System.Collections.Generic;

namespace EmailSender.API.Email.Models
{
    public class SendGridRequest
    {
        public IEnumerable<Personalization> Personalizations { get; set; }
        public EmailRecepient From { get; set; }
        public string Subject { get; set; }
        public IEnumerable<EmailContent> Content { get; set; }
        

        public class Personalization
        {
            public IEnumerable<EmailRecepient> Bcc { get; set; }
            public IEnumerable<EmailRecepient> Cc { get; set; }
            public IEnumerable<EmailRecepient> To { get; set; }
        }
        
        public class EmailRecepient
        {
            public string Email { get; set; }
            public string Name { get; set; }
        }
        
        public class EmailContent
        {
            public string Type { get; set; }
            public string Value { get; set; }
        }
    }
}
