﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmailSender.API.Email
{
    public interface IEmailService
    {
        void Send(EmailMessage message);
    }
}
