

function BuzzerButton({toggle, disabled}) {
  return (
    <button onClick = {toggle} disabled = {disabled}>
      Buzzer
    </button>
  )
}export default BuzzerButton;