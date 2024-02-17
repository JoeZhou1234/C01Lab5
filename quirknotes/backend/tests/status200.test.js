test("1+2=3, empty array is empty", () => {
    expect(1 + 2).toBe(3);
    expect([].length).toBe(0);
});

const SERVER_URL = "http://127.0.0.1:4000";
// const SERVER_URL = "http://localhost:4000";

test("/postNote - Post a note", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
});

test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
  const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
  });

  const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET",
  });

  const getAllNotesBody = await getAllNotesRes.json();

  expect(deleteAllNotesRes.status).toBe(200);
  expect(getAllNotesRes.status).toBe(200);
  expect(getAllNotesBody.response).toEqual([]);
});

test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
  const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
  });

  const title1 = "Note1Title";
  const content1 = "Note1Content";
  const postNote1Res = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title1,
      content: content1,
    }),
  });
  const postNote1Body = await postNote1Res.json();

  const title2 = "Note2Title";
  const content2 = "Note2Content";
  const postNote2Res = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title2,
      content: content2,
    }),
  });
  const postNote2Body = await postNote2Res.json();

  const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET",
  });
  const getAllNotesBody = await getAllNotesRes.json();
  const getAllNotesTitles = getAllNotesBody.response.map(note => note.title);
  const getAllNotesContent = getAllNotesBody.response.map(note => note.content);

  expect(deleteAllNotesRes.status).toBe(200);
  expect(postNote1Res.status).toBe(200);
  expect(postNote1Body.response).toBe("Note added succesfully.");
  expect(postNote2Res.status).toBe(200);
  expect(postNote2Body.response).toBe("Note added succesfully.");
  expect(getAllNotesRes.status).toBe(200);
  expect(getAllNotesTitles).toEqual([title1, title2]);
  expect(getAllNotesContent).toEqual([content1, content2]);
});

test("/deleteNote - Delete a note", async () => {
  const title = "NoteTitle";
  const content = "NoteContent";
  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });
  const postNoteBody = await postNoteRes.json();
  const noteId = postNoteBody.insertedId;

  const deleteNoteRes = await fetch(`${SERVER_URL}/deleteNote/${noteId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
  });
  const deleteNoteBody = await deleteNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
  expect(deleteNoteRes.status).toBe(200);
  expect(deleteNoteBody.response).toBe(`Document with ID ${noteId} deleted.`);
});

test("/patchNote - Patch with content and title", async () => {
  const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
  });

  const title = "NoteTitle";
  const content = "NoteContent";
  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });
  const postNoteBody = await postNoteRes.json();
  const noteId = postNoteBody.insertedId;

  const newTitle = "NewTitle";
  const newContent = "NewContent";
  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: newTitle,
      content: newContent,
    }),
  });
  const patchNoteBody = await patchNoteRes.json();

  expect(deleteAllNotesRes.status).toBe(200);
  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
  expect(patchNoteRes.status).toBe(200);
  expect(patchNoteBody.response).toBe(`Document with ID ${noteId} patched.`)
});

test("/patchNote - Patch with just title", async () => {
    const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
  });

  const title = "NoteTitle";
  const content = "NoteContent";
  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });
  const postNoteBody = await postNoteRes.json();
  const noteId = postNoteBody.insertedId;

  const newTitle = "NewTitle";
  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: newTitle,
    }),
  });
  const patchNoteBody = await patchNoteRes.json();

  expect(deleteAllNotesRes.status).toBe(200);
  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
  expect(patchNoteRes.status).toBe(200);
  expect(patchNoteBody.response).toBe(`Document with ID ${noteId} patched.`)
});

test("/patchNote - Patch with just content", async () => {
  const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
  });

  const title = "NoteTitle";
  const content = "NoteContent";
  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });
  const postNoteBody = await postNoteRes.json();
  const noteId = postNoteBody.insertedId;

  const newContent = "NewContent";
  const patchNoteRes = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: newContent,
    }),
  });
  const patchNoteBody = await patchNoteRes.json();

  expect(deleteAllNotesRes.status).toBe(200);
  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
  expect(patchNoteRes.status).toBe(200);
  expect(patchNoteBody.response).toBe(`Document with ID ${noteId} patched.`)
});

test("/deleteAllNotes - Delete one note", async () => {
  const deleteAllNotesRes1 = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
  });

  const title = "NoteTitle";
  const content = "NoteContent";
  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });
  const postNoteBody = await postNoteRes.json();

  const deleteAllNotesRes2 = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
  });
  const deleteAllNotes2Body = await deleteAllNotesRes2.json();

  expect(deleteAllNotesRes1.status).toBe(200);
  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
  expect(deleteAllNotesRes2.status).toBe(200);
  expect(deleteAllNotes2Body.response).toBe(`1 note(s) deleted.`);
});

test("/deleteAllNotes - Delete three notes", async () => {
  const deleteAllNotesRes1 = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
  });

  const title1 = "Note1Title";
  const content1 = "Note1Content";
  const postNoteRes1 = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title1,
      content: content1,
    }),
  });
  const postNote1Body = await postNoteRes1.json();

  const title2 = "Note2Title";
  const content2 = "Note2Content";
  const postNoteRes2 = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title2,
      content: content2,
    }),
  });
  const postNote2Body = await postNoteRes2.json();

  const title3 = "Note3Title";
  const content3 = "Note3Content";
  const postNoteRes3 = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title3,
      content: content3,
    }),
  });
  const postNote3Body = await postNoteRes3.json();

  const deleteAllNotesRes2 = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
  });
  const deleteAllNotes2Body = await deleteAllNotesRes2.json();

  expect(deleteAllNotesRes1.status).toBe(200);
  expect(postNoteRes1.status).toBe(200);
  expect(postNote1Body.response).toBe("Note added succesfully.");
  expect(postNoteRes2.status).toBe(200);
  expect(postNote2Body.response).toBe("Note added succesfully.");
  expect(postNoteRes3.status).toBe(200);
  expect(postNote3Body.response).toBe("Note added succesfully.");
  expect(deleteAllNotesRes2.status).toBe(200);
  expect(deleteAllNotes2Body.response).toBe(`3 note(s) deleted.`);
});

test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
  const deleteAllNotesRes = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
  });

  const title = "NoteTitle";
  const content = "NoteContent";
  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });
  const postNoteBody = await postNoteRes.json();
  const noteId = postNoteBody.insertedId;

  const color = "#FF0000";
  const updateNoteColorRes = await fetch(`${SERVER_URL}/updateNoteColor/${noteId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ color }),
  });
  const updateNoteColorBody = await updateNoteColorRes.json();

  expect(deleteAllNotesRes.status).toBe(200);
  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
  expect(updateNoteColorRes.status).toBe(200);
  expect(updateNoteColorBody.message).toBe("Note color updated successfully.");
});