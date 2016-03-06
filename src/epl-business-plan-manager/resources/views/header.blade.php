    <link rel="stylesheet" href="{{ elixir('css/all.css') }}">

    <div id="header-area">
        <img id="epl-logo" src="images/eplbpm-vertical.png" alt="EPL Logo">
        <div id="right-pos">
            <div id="nav">
                <ul>
                    <li><a href="dashboard" class="{{ Request::segments()[0] == "dashboard" ? "active" : "" }}">Dashboard</a></li>
                    <li><a href="view" class="{{ Request::segments()[0] == "view" ? "active" : "" }}">View Plan</a></li>
                    <li><a href="manage" class="{{ Request::segments()[0] == "manage" ? "active" : "" }}">Manage Plan</a></li>


                    <ul id="search-area">
                        <li class="search-bar"><a href="logout">Logout</a></li>
                    </ul>
                </ul>
                </div>
            </div>
        </div>
    </div>



