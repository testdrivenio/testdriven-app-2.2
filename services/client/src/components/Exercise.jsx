import React from 'react';
import PropTypes from 'prop-types';
import { Button, Glyphicon } from 'react-bootstrap';
import AceEditor from 'react-ace';
import 'brace/mode/python';
import 'brace/theme/solarized_dark';

const Exercise = (props) => {
  return (
    <div key={props.exercise.id}>
      <h4>{props.exercise.body}</h4>
        <AceEditor
          mode="python"
          theme="solarized_dark"
          name={(props.exercise.id).toString()}
          fontSize={14}
          height={'175px'}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={props.editor.value}
          style={{
            marginBottom: '10px'
          }}
          onChange={props.onChange}
        />
        {props.isAuthenticated &&
          <div>
            <Button
              bsStyle="primary"
              bsSize="small"
              onClick={(evt) => props.submitExercise(evt, props.exercise.id)}
              disabled={props.editor.button.isDisabled}
            >Run Code
            </Button>
          {props.editor.showGrading &&
            <h4>
              &nbsp;
              <Glyphicon glyph="repeat" className="glyphicon-spin"/>
              &nbsp;
              Grading...
            </h4>
          }
          {props.editor.showCorrect &&
            <h4>
              &nbsp;
              <Glyphicon glyph="ok" className="glyphicon-correct"/>
              &nbsp;
              Correct!
            </h4>
          }
          {props.editor.showIncorrect &&
            <h4>
              &nbsp;
              <Glyphicon glyph="remove" className="glyphicon-incorrect"/>
              &nbsp;
              Incorrect!
            </h4>
          }
          </div>
        }
      <br/><br/>
    </div>
  )
};

Exercise.propTypes = {
  exercise: PropTypes.shape({
    body: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    test_code: PropTypes.string.isRequired,
    test_code_solution: PropTypes.string.isRequired,
  }).isRequired,
  editor: PropTypes.shape({
    button: PropTypes.object.isRequired,
    showCorrect: PropTypes.bool.isRequired,
    showGrading: PropTypes.bool.isRequired,
    showIncorrect: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  submitExercise: PropTypes.func.isRequired,
};

export default Exercise;
