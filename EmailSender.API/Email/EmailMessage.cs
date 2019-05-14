using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmailSender.API.Email
{
    public class EmailMessage
    {
        public string Subject { get; set; }
        public string Message { get; set; }
        public string From { get; set; }
        public string[] To { get; set; }
        public string[] Cc { get; set; }
        public string[] Bcc { get; set; }
    }
}
