using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace EmailSender.API.Http
{
    public static class HttpJsonDataParser
    {
        public static string Serialize<T>(T data)
        {
            DefaultContractResolver contractResolver = new DefaultContractResolver
            {
                NamingStrategy = new CamelCaseNamingStrategy()
            };

            return JsonConvert.SerializeObject(data, new JsonSerializerSettings
            {
                ContractResolver = contractResolver,
                Formatting = Formatting.Indented,
                NullValueHandling = NullValueHandling.Ignore
            });
        }
    }
}
