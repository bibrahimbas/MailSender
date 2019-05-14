This project is to send email through two email service. One is MailGun, the other one is SendGrid.
The solution consists of two project that are UI and API projects.
- API project is built upon DotNet Core MVC framework and designed as a Rest service.
- UI project is a ReactJS project.

## Executing Solution
UI is dependent to API project. We set multiple startup for the solution.
We can also run projects seperately. After starting API service, we can start UI application.

## Configuration
In the appsettings.json file of API project, we need to set configuration for the email services.
ApiKey and the domain can be set in the configuration file like below.

```json
{
  "Email": {
    "MailGun": {
      "BaseUrl": "https://api.mailgun.net/v3",
      "ApiKey": "api:api_key",
      "Domain": "www.mydomain.com"
    },
    "SendGrid": {
      "BaseUrl": "https://api.sendgrid.com/v3/mail/send",
      "ApiKey": "api_key"
    }
  }
}
```

API url and port is set in HttpService.js file of UI project. If needed, it can be changed in that file.