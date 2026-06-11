# JS OUR TEAM

A simple DOM‑manipulation project based on an array of team member objects. The page dynamically renders one card per member, supports responsive wrapping, and includes a form that lets users add new members and display them in real time.

# Target

Given an array of objects representing a company team, create a dedicated page that displays a card for each team member.

**Bonus**

- Make the exercise responsive by allowing the cards to wrap onto new lines.

- Add a member‑addition form that displays the newly added member on the page.

## Project screenshot

![js-our-team](assets/img/screenshot.png)

## Technical Notes

### Image Handling with FileReader

The project uses the FileReader API to process user‑uploaded images when adding a new team member. Since localStorage can only store text data, images cannot be saved in their original binary format. To solve this limitation, the selected image file is converted into a Base64‑encoded Data URL.

This approach allows the application to:

- store the uploaded image persistently inside localStorage

- immediately display the image in the newly generated team card

- avoid server‑side uploads or external file management

- keep the entire project fully client‑side and self‑contained

- The following snippet performs the conversion:

const reader = new FileReader();
reader.onload = function(e) {
  addMember(e.target.result); // Base64
};
reader.readAsDataURL(imageInput.files[0]);

Once converted, the Base64 string is passed to the addMember() function, ensuring that the new member’s image is correctly rendered and preserved across page reloads.
