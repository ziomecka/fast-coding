import { default as DragOverable } from './component';
import { PaperProps } from '@material-ui/core/Paper';
const DragOverableContainer = DragOverable;

export default DragOverableContainer;

export interface DragOverableProps extends PaperProps {
    onDragOver?: ( e: React.DragEvent<HTMLElement> ) => void;
    onDrop: ( e: React.DragEvent<HTMLElement> ) => void;
}
