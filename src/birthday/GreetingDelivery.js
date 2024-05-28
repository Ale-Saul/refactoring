export class GreetingDelivery {
    constructor(mailService) {
      this.mailService = mailService;
    }
  
    sendGreetingToEmployee(employee) {
      const message = {
        from: "sender@here.com",
        to: [employee.getEmail()],
        subject: "Happy Birthday!",
        text: `Happy Birthday, dear ${employee.getFirstName()}!`,
      };
      this.mailService.sendMail(message);
    }
  }
  