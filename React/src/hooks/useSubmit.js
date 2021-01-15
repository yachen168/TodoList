export default function useSubmitHandler(confirmCallback, inputValue) {
  return (e) => {
    e.preventDefault();

    if (!inputValue) {
      alert('請輸入代辦事項名稱');
    } else {
      confirmCallback();
    }
  };
}
