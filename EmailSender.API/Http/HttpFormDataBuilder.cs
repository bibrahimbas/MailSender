using System;
using System.Collections.Generic;
using System.Linq;

namespace EmailSender.API.Http
{
    public class HttpFormDataBuilder
    {
        private readonly List<Tuple<string, string>> _formData;

        public HttpFormDataBuilder()
        {
            _formData = new List<Tuple<string, string>>();
        }

        public HttpFormDataBuilder AddFormData(string key, string value)
        {
            _formData.Add(new Tuple<string, string>(key, value));
            return this;
        }

        public string Build()
        {
            var result = "";
            foreach(var data in _formData)
            {
                result += string.Format("{0}={1}", data.Item1, data.Item2);
                if (data != _formData.Last())
                    result += "&";
            }
            return result;
        }
    }
}
