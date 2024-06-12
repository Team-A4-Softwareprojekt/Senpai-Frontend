import FillInTheBlankText from "../../../components/fillInTheBlankText/FillInTheBlankText";

function GapTextPage() {
    const text = "This is a template text";
    const blankIndices = [1, 3];
    return (<FillInTheBlankText text={text} blankIndices={blankIndices}></FillInTheBlankText>)
}
export default GapTextPage;