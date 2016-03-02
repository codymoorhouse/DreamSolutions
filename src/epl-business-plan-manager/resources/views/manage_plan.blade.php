@extends('app')

@section('head')
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <link rel="stylesheet" type="text/css" href="/css/manage_plan.css"></link>
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
@stop

@section('content')
    <div id="manage-plan-area">

        <div style="height: 25px">
            <div style="float: left">
                <label>Business Plan Year: </label>
                <select>
                    <option>Load years here</option>
                </select>
            </div>

            <div style="float: right;">
                <a href="{{ action('WizardController@create') }}">Create Business Plan</a>
            </div>
        </div>

        <!-- Top level tab container for create, update, delete -->
        <div class="container">
          <ul class="nav nav-tabs">
            <li class="active"><a data-toggle="tab" href="#create">Create</a></li>
            <li><a data-toggle="tab" href="#update">Update</a></li>
            <li><a data-toggle="tab" href="#delete">Delete</a></li>
          </ul>

          <div class="tab-content">
            <div id="create" class="tab-pane fade in active">
              <h3>Create</h3>
              <div class="container">
              <ul class="nav nav-pills">
                <li class="active"><a data-toggle="pill" href="#cgoal">Goal</a></li>
                <li><a data-toggle="pill" href="#cobjective">Objective</a></li>
                <li><a data-toggle="pill" href="#caction">Action</a></li>
                <li><a data-toggle="pill" href="#ctask">Task</a></li>
              </ul>
              
              <div class="tab-content">
                <div id="cgoal" class="tab-pane fade in active">
                  <h3>Goal</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                <div id="cobjective" class="tab-pane fade">
                  <h3>Objective</h3>
                  <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
                <div id="caction" class="tab-pane fade">
                  <h3>Action</h3>
                  <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
                </div>
                <div id="ctask" class="tab-pane fade">
                  <h3>Task</h3>
                  <p>Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                </div>
              </div>
            </div>
            </div>
            <div id="update" class="tab-pane fade">
              <h3>Update</h3>
              <div class="container">
              <ul class="nav nav-pills">
                <li class="active"><a data-toggle="pill" href="#ugoal">Goal</a></li>
                <li><a data-toggle="pill" href="#uobjective">Objective</a></li>
                <li><a data-toggle="pill" href="#uaction">Action</a></li>
                <li><a data-toggle="pill" href="#utask">Task</a></li>
              </ul>
              
              <div class="tab-content">
                <div id="ugoal" class="tab-pane fade in active">
                  <h3>Goal</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                <div id="uobjective" class="tab-pane fade">
                  <h3>Objective</h3>
                  
                </div>
                <div id="uaction" class="tab-pane fade">
                  <h3>Action</h3>
                  <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
                </div>
                <div id="utask" class="tab-pane fade">
                  <h3>Task</h3>
                  
                </div>
              </div>
            </div>
            </div>
            <div id="delete" class="tab-pane fade">
              <h3>Delete</h3>
              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
            </div>
                
          </div>
        </div>

    </div>
@stop
