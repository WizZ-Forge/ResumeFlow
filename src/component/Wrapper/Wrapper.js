import { usePDF } from 'react-to-pdf';
import Basic from '../Templates/Basic'; // Your class comp

const Wrapper = ({ obj }) => {
  const { toPDF, targetRef } = usePDF({
    filename: `${obj.name}-resume.pdf`,
  });
  return (
    <div>
      <div ref={targetRef}>
        <Basic obj={obj} />
      </div>

      <button onClick={toPDF}>Download</button>
    </div>
  );
};
export default Wrapper;
