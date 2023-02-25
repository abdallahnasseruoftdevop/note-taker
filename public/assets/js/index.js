// Element selectors
const $noteTitle = $(".note-title");
const $noteText = $(".note-textarea");
const $saveNoteBtn = $(".save-note");
const $newNoteBtn = $(".new-note");
const $noteList = $(".list-container .list-group");

// Keeps track of the note in the textarea
let activeNote = {};

// Retrieves all notes from the server
const getNotes = () => $.ajax({ url: "/api/notes", method: "GET" });

// Saves a note to the server
const saveNote = note =>
  $.ajax({ url: "/api/notes", data: note, method: "POST" });

// Deletes a note from the server
const deleteNote = id =>
  $.ajax({ url: `api/notes/${id}`, method: "DELETE" });

// Displays the active note or empty inputs if no active note
const renderActiveNote = () => {
  $saveNoteBtn.hide();
  if (activeNote.id) {
    $noteTitle.add($noteText).attr("readonly", true);
    $noteTitle.val(activeNote.title);
    $noteText.val(activeNote.text);
  } else {
    $noteTitle.add($noteText).attr("readonly", false);
    $noteTitle.add($noteText).val("");
  }
};

// Handles saving a note
const handleNoteSave = () => {
  const newNote = { title: $noteTitle.val(), text: $noteText.val() };
  saveNote(newNote).then(() => {
    activeNote = {};
    getAndRenderNotes();
  });
};

// Handles deleting a note
const handleNoteDelete = event => {
  event.stopPropagation();
  const note = $(event.target).parent(".list-group-item").data();
  if (activeNote.id === note.id) activeNote = {};
  deleteNote(note.id).then(getAndRenderNotes);
};

// Sets the active note and displays it
const handleNoteView = () => {
  activeNote = $(this).data();
  renderActiveNote();
};

// Sets the active note to an empty object
const handleNewNoteView = () => {
  activeNote = {};
  renderActiveNote();
};

// Shows or hides the save button based on whether title or text are empty
const handleRenderSaveBtn = () =>
  $saveNoteBtn.toggle(Boolean($noteTitle.val().trim() && $noteText.val().trim()));

// Renders the list of note titles
const renderNoteList = notes => {
  $noteList.empty();
  const noteListItems = notes.map(note => {
    const $li = $("<li class='list-group-item'>")
      .data(note)
      .append($("<span>").text(note.title))
      .append($("<i class='fas fa-trash-alt float-right text-danger delete-note'>"));
    return $li;
  });
  $noteList.append(noteListItems);
};

// Retrieves and renders the list of notes
const getAndRenderNotes = () => getNotes().then(renderNoteList);

// Event listeners
$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.add($noteText).on("keyup", handleRenderSaveBtn);

// Renders the initial list of notes
getAndRenderNotes();
