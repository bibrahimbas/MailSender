using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmailSender.API.Config
{
    public class SendGridConfiguration
    {
        public string BaseUrl { get; set; }
        public string ApiKey { get; set; }
    }
}
