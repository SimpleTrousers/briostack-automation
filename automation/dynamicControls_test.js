const assert = require("assert");

const expectedMessageOnRemove = "It's gone!";
const expectedMessageOnAdd = "It's back!";
const expectedMessageOnEnable = "It's enabled!";
const expectedMessageOnDisable = "It's disabled!";

Feature('dynamicControls');

Scenario('Remove, add element', async ({ I, dynamicControlsPage }) => {
    I.amOnPage(dynamicControlsPage.pageURL);
    I.see(dynamicControlsPage.pageTitle);
    I.see("Remove/add");
    I.see("A checkbox");
    I.click("Remove");
    I.waitForInvisible(dynamicControlsPage.locators.loadingBar, 10);
    I.waitForVisible(dynamicControlsPage.locators.message, 5);
    let actualMessageRemove = await I.grabTextFrom(dynamicControlsPage.locators.message);
    assert.equal(actualMessageRemove, expectedMessageOnRemove,
        "The message on element removal doesn't match what was expected: Expected: " + expectedMessageOnRemove + " Actual: " + actualMessageRemove);
    I.dontSee("A checkbox");
    I.click("Add");
    I.waitForInvisible(dynamicControlsPage.locators.loadingBar, 10);
    I.waitForVisible(dynamicControlsPage.locators.message, 5);
    let actualMessageAdd = await I.grabTextFrom(dynamicControlsPage.locators.message);
    assert.equal(actualMessageAdd, expectedMessageOnAdd,
        "The message on add element doesn't match what was expected: Expected: " + expectedMessageOnAdd + " Actual: " + actualMessageAdd);
    I.see("A checkbox");
});

Scenario('Enable, disable element', async ({ I, dynamicControlsPage }) => {
    I.amOnPage(dynamicControlsPage.pageURL);
    I.see("Enable/disable");
    I.seeElement(dynamicControlsPage.locators.disabledInput);
    I.click("Enable");
    I.waitForInvisible(dynamicControlsPage.locators.loadingBar, 10);
    I.waitForVisible(dynamicControlsPage.locators.message, 5);
    let actualMessageEnable = await I.grabTextFrom(dynamicControlsPage.locators.message);
    assert.equal(actualMessageEnable, expectedMessageOnEnable,
        "The message on enable element doesn't match what was expected: Expected: " + expectedMessageOnEnable + " Actual: " + actualMessageEnable);
    I.dontSeeElement(dynamicControlsPage.locators.disabledInput);
    I.seeElement(dynamicControlsPage.locators.enabledInput);
    I.click("Disable");
    I.waitForInvisible(dynamicControlsPage.locators.loadingBar, 10);
    I.waitForVisible(dynamicControlsPage.locators.message, 5);
    let actualMessageDisable = await I.grabTextFrom(dynamicControlsPage.locators.message);
    assert.equal(actualMessageDisable, expectedMessageOnDisable,
        "The message on disable element doesn't match what was expected: Expected: " + expectedMessageOnDisable + " Actual: " + actualMessageDisable);
    I.seeElement(dynamicControlsPage.locators.disabledInput);
});