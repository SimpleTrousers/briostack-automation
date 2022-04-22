const assert = require("assert");

const expectedNumberOfElements = 100;

Feature('addRemove');

Scenario('Add, remove a bunch of elements', async ({ I, addRemovePage }) => {
    I.amOnPage(addRemovePage.pageURL);
    I.see(addRemovePage.pageTitle);
    for (let i = 0; i < expectedNumberOfElements; i++) {
        I.click("Add Element");
    }
    let actualNumberOfElements = await I.grabNumberOfVisibleElements(addRemovePage.locators.addedElementsOrDeleteButtons);
    assert.equal(actualNumberOfElements, expectedNumberOfElements,
        "Incorrect number of elements added. Expected: " + expectedNumberOfElements + " Actual: " + actualNumberOfElements);
    await eachElement('Delete all elements added', addRemovePage.locators.addedElementsOrDeleteButtons, async (addedElement) => {
        await addedElement.click();
    });
    let newActualNumberOfElements = await I.grabNumberOfVisibleElements(addRemovePage.locators.addedElementsOrDeleteButtons);
    assert.equal(newActualNumberOfElements, 0, "Deletion of all elements failed");
});