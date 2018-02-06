# services/exercises/project/api/exercises.py


from sqlalchemy import exc
from flask import Blueprint, jsonify, request

from project import db
from project.api.models import Exercise
from project.api.utils import authenticate


exercises_blueprint = Blueprint('exercises', __name__)


@exercises_blueprint.route('/exercises/ping', methods=['GET'])
def ping_pong():
    return jsonify({
        'status': 'success',
        'message': 'pong!'
    })


@exercises_blueprint.route('/exercises', methods=['GET'])
def get_all_exercises():
    """Get all exercises"""
    response_object = {
        'status': 'success',
        'data': {
            'exercises': [ex.to_json() for ex in Exercise.query.all()]
        }
    }
    return jsonify(response_object), 200


@exercises_blueprint.route('/exercises', methods=['POST'])
@authenticate
def add_exercise(resp):
    """Add exercise"""
    if not resp['admin']:
        response_object = {
            'status': 'error',
            'message': 'You do not have permission to do that.'
        }
        return jsonify(response_object), 401
    post_data = request.get_json()
    if not post_data:
        response_object = {
            'status': 'fail',
            'message': 'Invalid payload.'
        }
        return jsonify(response_object), 400
    body = post_data.get('body')
    test_code = post_data.get('test_code')
    test_code_solution = post_data.get('test_code_solution')
    try:
        db.session.add(Exercise(
            body=body,
            test_code=test_code,
            test_code_solution=test_code_solution))
        db.session.commit()
        response_object = {
            'status': 'success',
            'message': 'New exercise was added!'
        }
        return jsonify(response_object), 201
    except (exc.IntegrityError, ValueError) as e:
        db.session().rollback()
        response_object = {
            'status': 'fail',
            'message': 'Invalid payload.'
        }
        return jsonify(response_object), 400
