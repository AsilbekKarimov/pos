import React from 'react'

const Button = ({ row, setFilteredData , rolls}) => {
  const handleClickButton = async (row) => {
    const updatedRow = { ...row, is_active: !row.is_active };

    try {
      await postToBackend(updatedRow);
      setFilteredData((prevData) =>
        prevData.map((item) =>
          item.id === row.id
            ? { ...item, is_active: updatedRow.is_active }
            : item
        )
      );
    } catch (error) {
      console.error("Ошибка при обновлении состояния пользователя:", error);
    }
  };

  const postToBackend = async (updatedRow) => {
    console.log(updatedRow);
    const response = await fetch(
      `https://newterminal.onrender.com/api/${rolls}/${updatedRow.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(updatedRow),
      }
    );
    if (!response.ok) {
      throw new Error("Не удалось обновить пользователя");
    }
  };
  return (
    <button
      onClick={() => handleClickButton(row)}
      className={`mx-auto flex justify-center my-auto py-2 active:scale-90 transition duration-300 w-32 ${row.is_active
        ? "bg-green-500 hover:bg-green-700"
        : "bg-red-500 hover:bg-red-700"
        } flex rounded-md text-white px-3`}
    >
      {row.is_active
        ? "Активный"
        : "Не активный"}
    </button>
  )
}

export default Button
