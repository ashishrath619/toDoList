const initialState = {
  toDoList: [
    {
      id: 1,
      data: {
        title: "Morning Run",
        time: {
          $d: "Tue Aug 30 2022 05:24:00 GMT+0530 (India Standard Time)",
        },
      },
    },
    {
      id: 2,
      data: {
        title: "Buy Pizza on the way to work",
        time: {
          $d: "Tue Aug 30 2022 09:24:00 GMT+0530 (India Standard Time)",
        },
      },
    },
  ],
};

const toDoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "Add_Data":
      const { id, data } = action.payload;
      return {
        ...state,
        toDoList: [
          ...state.toDoList,
          {
            id: id,
            data: data,
          },
        ],
      };
      break;
    case "Delete_Data":
      const newtoDoList = state.toDoList.filter(
        (item) => item.id !== action.id
      );
      return {
        ...state,
        toDoList: newtoDoList,
      };
      break;

    case "Edit_Data":
      const newtoDoEditList = state.toDoList.map((item) =>
        item.id == action.payload.id ? action.payload : item
      );

      return {
        ...state,
        toDoList: newtoDoEditList,
      };

    default:
      return state;
  }
};

export default toDoReducer;
