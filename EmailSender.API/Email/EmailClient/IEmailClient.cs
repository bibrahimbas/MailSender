using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmailSender.API.Email.EmailClient
{
    public interface IEmailClient
    {
        EmailResult Send(EmailMessage message);
    }
}
