import { default as LessonView } from './component';
import { withRouter, RouteComponentProps} from 'react-router-dom';

const LessonViewContainer = withRouter( LessonView );

export default LessonViewContainer;

export interface LessonViewProps extends RouteComponentProps<{}> {
}