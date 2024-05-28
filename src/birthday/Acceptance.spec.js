import { OurDate } from "./OurDate";
import { InMemoryTransport } from "./InMemoryTransport";
import { BirthdayService } from "./BirthdayService";
import { FileEmployeeRepository } from "./EmployeesRepository";
import { SmtpGreetingDelivery } from "./GreetingDelivery";


describe("Acceptance", () => {
  const SMTP_PORT = 25;
  const SMTP_URL = "localhost";
  const FILENAME = "employee_data.txt";
  let birthdayService;
  let transport; 

  beforeEach(() => {
    transport = new InMemoryTransport();
    birthdayService = new BirthdayService();
  });

  it("base scenario", () => {
    const SMTP_PORT = 25;
    const SMTP_URL = "localhost";
    const FILENAME = "employee_data.txt";

    const transport = nodemailer.createTransport({
      host: SMTP_URL,
      port: SMTP_PORT,
      secure: false,
      auth: {
        user: "username",
        pass: "password",
      },
    });

    const messageDelivery = new SmtpGreetingDelivery(SMTP_URL, SMTP_PORT, transport);
    const employeesRepository = new FileEmployeeRepository(FILENAME);
    const birthdayService = new BirthdayService(messageDelivery, employeesRepository);

    birthdayService.sendGreetings(new Date("2008/10/08"));

    expect(transport.messagesSent.length).toEqual(1);
  });


  it("will not send emails when nobodys birthday", () => {
    birthdayService.sendGreetings(
      new OurDate("2008/01/01"),
      "employee_data.txt",
      SMTP_URL,
      SMTP_PORT,
      transport
    );

    expect(transport.messagesSent.length).toEqual(0);
  });

  it("uses correct transport", () => {
    birthdayService.sendGreetings(
      new OurDate("2008/10/08"),
      "employee_data.txt",
      SMTP_URL,
      SMTP_PORT,
      transport
    );

    const message = transport.messagesSent[0];
    expect(message.host).toEqual(SMTP_URL);
    expect(message.port).toEqual(SMTP_PORT);
  });
});
