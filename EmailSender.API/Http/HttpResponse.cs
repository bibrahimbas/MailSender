using System;

namespace EmailSender.API.Http
{
    public class HttpResponse
    {
        public int StatusCode { get; set; }
        public Exception Exception { get; set; }
    }
}
