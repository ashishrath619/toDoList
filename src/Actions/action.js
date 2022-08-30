export const Add_Data = (data) => {
  return {
    type: "Add_Data",
    payload: {
      id: new Date().getTime().toString(),
      data: data,
    },
  };
};
export const Delete_Data = (id) => {
  return {
    type: "Delete_Data",
    id,
  };
};
export const Edit_Data = (data) => {
  console.log("Actiondata", data);
  return {
    type: "Edit_Data",
    payload: {
      id: data.id,
      data: data.body,
    },
  };
};
