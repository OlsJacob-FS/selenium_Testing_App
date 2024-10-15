require("chromedriver");
const { Builder, By, Key, until } = require("selenium-webdriver");

describe("Testing supplied front-end application", () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
  });

  afterAll(async () => {
    await driver.quit();
  });

  const setDelay = async () => {
    await driver.sleep(1000);
  };

  it("should open homepage - and check the title is Home", async () => {
    await driver.get("http://localhost:3000/");
    await setDelay();
    await driver.getTitle().then((title) => {
      expect(title).toContain("Home");
    });
    await setDelay();
  });

  it("should open contact page - and check the title is Contact Us", async () => {
    await driver.get("http://localhost:3000/contact");
    await setDelay();
    await driver.getTitle().then((title) => {
      expect(title).toBe("Contact Us");
    });
    await setDelay();
  });

  it("should sign up for more info via email - and check the message is 'More info coming to ' and then the email address entered", async () => {
    await driver.get("http://localhost:3000/contact");
    let formElement = driver.findElement(By.id("formInput"));
    let testEmail = "test@email.com";
    await formElement.sendKeys(testEmail);
    let submitElement = driver.findElement(By.id("formSubmit"));
    await submitElement.sendKeys(Key.ENTER);
    await driver.wait(
      until.elementTextContains(
        driver.findElement(By.id("formMessage")),
        "More info coming to ",
        testEmail
      ),
      1000
    );
    await setDelay();
  });
});

// driver
//   .get("http://www.google.com/ncr")
//   .then((_) =>
//     driver.findElement(By.name("q")).sendKeys("nicholas cage", Key.RETURN)
//   )
//   .then((_) =>
//     driver.wait(until.titleIs("nicholas cage - Google Search"), 1000)
//   )
//   .then((_) => driver.quit());
