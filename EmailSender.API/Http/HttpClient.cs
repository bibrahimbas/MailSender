using System;
using System.Net;
using System.Text;

namespace EmailSender.API.Http
{
    public class HttpClient : IHttpClient
    {
        public HttpResponse PostAsync(string uri, HttpHeaderCollection headers, string body)
        {
            try
            {
                var client = (HttpWebRequest)WebRequest.Create(new Uri(uri));
                client.Method = "POST";
                foreach (var header in headers)
                {
                    client.Headers.Add(header.Key, header.Value);
                }

                var requestBuffer = Encoding.UTF8.GetBytes(body);

                using (var requestStream = client.GetRequestStream())
                {
                    requestStream.Write(requestBuffer, 0, requestBuffer.Length);

                    using (var response = (HttpWebResponse)client.GetResponse())
                    {
                        return new HttpResponse { StatusCode = (int)response.StatusCode };
                    }
                }
            }
            catch (WebException exception)
            {
                return new HttpResponse { StatusCode = (int)((HttpWebResponse)exception.Response).StatusCode, Exception = exception };
            }
            catch (Exception exception)
            {
                return new HttpResponse { StatusCode = 500, Exception = exception };
            }
        }
    }
}
