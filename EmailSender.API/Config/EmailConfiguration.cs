using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmailSender.API.Config
{
    public class EmailConfiguration
    {
        public MailGunConfiguration MailGun { get; set; }
        public SendGridConfiguration SendGrid { get; set; }
    }
}
