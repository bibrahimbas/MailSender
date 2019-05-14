namespace EmailSender.API.Http
{
    public interface IHttpClient 
    {
        HttpResponse PostAsync(string uri, HttpHeaderCollection headers, string body);
    }
}
