class Utils
{
    getRootElement      = null; // args: void
    getRootObject       = null; // args: void
    getRenderElement    = null; // args: void
    getRandomArbitrary  = null; // args: void

    isNotOpenChat       = null; // args: void
    isParkourMode       = null; // args: void
    isNotKillZone       = null; // args: 1 - world, 2 - position {x, y, z}
    isGameReady         = null; // args: void

    errorLog            = null; // args: 1 - text
}

utilsObjects =
{
    rootElement: null,
    rootObject: null
}

// utils.c.js

Utils.getRootElement = function ()
{
    if (utilsObjects.rootElement)
    {
        return utilsObjects.rootElement;
    }

    return utilsObjects.rootElement = document.getElementById("root")._reactRootContainer;
}

Utils.getRootObject = function ()
{
    if (utilsObjects.rootObject)
    {
        return utilsObjects.rootObject;
    }

    if (!this.getRootElement().hasOwnProperty("_internalRoot"))
    {
        return null;
    }

    return utilsObjects.rootObject = this.getRootElement()._internalRoot.current.memoizedState.
        element.type.prototype;
}

Utils.getRenderElement = function ()
{
    return document.getElementsByClassName("sc-bwzfXH hjlOfi").item(0);
}

Utils.getRandomArbitrary = function (min, max)
{
    return Math.random() * (max - min) + min;
}

Utils.isNotOpenChat = function ()
{
    return (document.getElementsByClassName("sc-bwzfXH iokmvL").item(0) == null);
}

Utils.isParkourMode = function ()
{
    let rootObject = this.getRootObject();

    if (!rootObject)
        return false;

    return rootObject.store.state.battleStatistics.isParkourMode;
}

Utils.isNotKillZone = function (world, position)
{
    if (!this.isParkourMode())
    {
        return true;
    }

    if (!world)
        return false;

    let bounds = world.entities_0.array_hd7ov6$_0.at(0).components_0.array.at(0).bounds;

    if (!bounds)
        return false;

    if (position.x != 0 && (position.x >= bounds.maxX || position.x <= bounds.minX))
        return false;

    if (position.y != 0 && (position.y >= bounds.maxY || position.y <= bounds.minY))
        return false;

    return true;

    if (position.z != 0 && (position.z >= bounds.maxZ || position.z <= bounds.minZ))
        return false;

    return true;
}

Utils.isGameReady = function ()
{
    let renderElement = this.getRenderElement();

    if (!renderElement)
        return false;

    let rootObject = this.getRootObject();

    if (!rootObject)
        return false;

    return rootObject.store.state.battleStatistics.battleLoaded;
}

Utils.errorLog = function (text)
{
    console.log("[Assistant] " + text);
}

// gameObjects.h.js

class GameObjects
{
    // World
    getWorld                = null; // args: void
    getGameActions          = null; // args: void
    getMines                = null; // args: void

    // Tank
    getLocalPlayer          = null; // args: void
    getPhysicsComponent     = null; // args: void
    getHealthComponent      = null; // args: void
    getCamera               = null; // args: void

    // Weapon
    getStrikerComponent     = null; // args: void
}

gameObjects =
{
    localPlayer: null,
    world: null,
    gameActions: null,
    mines: null,
    physicsComponent: null,
    healthComponent: null,
    camera: null,
    strikerComponent: null
}

// gameObjects.c.js

GameObjects.getWorld = function ()
{
    if (gameObjects.world)
    {
        return gameObjects.world;
    }

    let localPlayer = this.getLocalPlayer();

    if (!localPlayer)
    {
        return null;
    }

    return gameObjects.world = localPlayer.at(0).world;
}

GameObjects.getGameActions = function ()
{
    if (gameObjects.gameActions)
    {
        return gameObjects.gameActions;
    }

    let world = this.getWorld();

    if (!world)
    {
        return null;
    }

    return gameObjects.gameActions = Array.from(world.inputManager.input.gameActions_0.map);
}

GameObjects.getMines = function ()
{
    if (gameObjects.mines)
    {
        return gameObjects.mines;
    }

    let world = this.getWorld();

    if (!world)
    {
        return null;
    }

    return gameObjects.mines = world.entities_0.array_hd7ov6$_0.at(0).components_0.array.at(15);
}

GameObjects.getLocalPlayer = function ()
{
    if (gameObjects.localPlayer)
    {
        return gameObjects.localPlayer;
    }

    let rootObject = Utils.getRootObject();

    if (!rootObject)
    {
        console.log("!rootObject");
        return null;
    }

    let subs = rootObject.store.subscribers.array_hd7ov6$_0;

    if (!subs)
    {
        console.log("!subs");
        return null;
    }

    for (let i = 0; i < subs.length; i++)
    {
        if (subs.at(i).hasOwnProperty("tank"))
        {
            return gameObjects.localPlayer = subs.at(i).tank.components_0.array;
        }
    }

    return null;
}

GameObjects.getPhysicsComponent = function ()
{
    if (gameObjects.physicsComponent)
    {
        return gameObjects.physicsComponent;
    }

    let localPlayer = this.getLocalPlayer();

    if (!localPlayer)
    {
        return null;
    }

    for (let i = 0; i < localPlayer.length; i++)
    {
        if (localPlayer.at(i).hasOwnProperty("tankPhysicsComponent_tczrao$_0"))
            return gameObjects.physicsComponent = localPlayer.at(i).tankPhysicsComponent_tczrao$_0;
    }

    return null;
}

// ПЕРЕДЕЛАТЬ
GameObjects.getHealthComponent = function ()
{
    if (gameObjects.healthComponent)
    {
        return gameObjects.healthComponent;
    }

    let localPlayer = this.getLocalPlayer();

    if (!localPlayer)
    {
        return null;
    }

    return gameObjects.healthComponent = localPlayer.at(1);
}

GameObjects.getCamera = function ()
{
    if (gameObjects.camera)
    {
        return gameObjects.camera;
    }

    let localPlayer = this.getLocalPlayer();

    if (!localPlayer)
    {
        return null;
    }

    for (let i = 0; i < localPlayer.length; i++)
    {
        if (localPlayer.at(i).hasOwnProperty("followCamera_w8ai3w$_0"))
            return gameObjects.camera = localPlayer.at(i).followCamera_0.currState_0;
    }

    return null;
}

GameObjects.getStrikerComponent = function ()
{
    if (gameObjects.strikerComponent)
    {
        return gameObjects.strikerComponent;
    }

    let localPlayer = this.getLocalPlayer();

    if (!localPlayer)
    {
        return null;
    }

    for (let i = 0; i < localPlayer.length; i++)
    {
        if (localPlayer.at(i).hasOwnProperty("strikerWeapon_jjsiik$_0"))
            return gameObjects.strikerComponent = localPlayer.at(i).strikerWeapon_jjsiik$_0;
    }

    return null;
}
// airBreak.h.js
class AirBreak
{
    process = null; // args: 1 - localPlayer
}

const airBreak =
{
    isShiftPressed: false,
    antiAim: false,
    state: false,
    speed: 50,
    position: { x: 0, y: 0, z: 0 },
    velocity: { x: 0, y: 0, z: 0 }
}

// airBreak.c.js

document.addEventListener('keyup', (e) =>
{
    if (e.keyCode == 16 && e.location == 2 && Utils.isGameReady() && Utils.isNotOpenChat())
    {
        airBreak.isShiftPressed = true;
    }
})

document.addEventListener('keyup', (e) =>
{
    if (e.keyCode == 74 && Utils.isGameReady() && Utils.isNotOpenChat())
    {
        airBreak.antiAim = !airBreak.antiAim;
    }
})

AirBreak.process = function (localPlayer)
{
    if (!localPlayer)
    {
        return;
    }

    let world = GameObjects.getWorld();

    if (!world)
    {
        return;
    }

    let physicsComponent = GameObjects.getPhysicsComponent();

    if (!physicsComponent)
    {
        return;
    }

    let camera = GameObjects.getCamera();

    if (!camera)
    {
        return;
    }

    let bodies = world.physicsScene_0.bodies_0.array_hd7ov6$_0;

    if (!bodies)
    {
        return;
    }

    if (airBreak.isShiftPressed)
    {
        airBreak.isShiftPressed = false;

        airBreak.state = !airBreak.state;

        if (airBreak.state)
        {
            airBreak.position.x = physicsComponent.body.state.position.x;
            airBreak.position.y = physicsComponent.body.state.position.y;
            airBreak.position.z = physicsComponent.body.state.position.z;

            airBreak.velocity.x = 0;
            airBreak.velocity.y = 0;
            airBreak.velocity.z = 0;
        }
        else
        {
            physicsComponent.body.state.velocity.x = 0;
            physicsComponent.body.state.velocity.y = 0;
            physicsComponent.body.state.velocity.z = 0;

            physicsComponent.body.state.angularVelocity.x = 0;
            physicsComponent.body.state.angularVelocity.y = 0;
            physicsComponent.body.state.angularVelocity.z = 0;

            for (let i = 0; i < bodies.length; i++)
            {
                bodies.at(i).movable = true;
            }
        }
    }

    if (!airBreak.state)
        return;

    let direction = camera.direction;

    airBreak.velocity.x = 0;
    airBreak.velocity.y = 0;

    if (KeyPressing.isKeyPressed(87 /*key: W*/) && Utils.isNotOpenChat())
    {
        let position =
        {
            x: airBreak.position.x + airBreak.speed * Math.sin(-direction),
            y: airBreak.position.y + airBreak.speed * Math.cos(-direction),
            z: 0
        };

        if (Utils.isNotKillZone(world, position))
        {
            airBreak.position.x = position.x;
            airBreak.position.y = position.y;

            airBreak.velocity.x += physicsComponent.body.maxSpeedXY * Math.sin(-direction);
            airBreak.velocity.y += physicsComponent.body.maxSpeedXY * Math.cos(-direction);
        }
    }

    if (KeyPressing.isKeyPressed(83 /*key: S*/) && Utils.isNotOpenChat())
    {
        let position =
        {
            x: airBreak.position.x - airBreak.speed * Math.sin(-direction),
            y: airBreak.position.y - airBreak.speed * Math.cos(-direction),
            z: 0
        };

        if (Utils.isNotKillZone(world, position))
        {
            airBreak.position.x = position.x;
            airBreak.position.y = position.y;

            airBreak.velocity.x -= physicsComponent.body.maxSpeedXY * Math.sin(-direction);
            airBreak.velocity.y -= physicsComponent.body.maxSpeedXY * Math.cos(-direction);
        }
    }

    if (KeyPressing.isKeyPressed(65 /*key: A*/) && Utils.isNotOpenChat())
    {
        let position =
        {
            x: airBreak.position.x - airBreak.speed * Math.sin(-(direction - Math.PI / 2)),
            y: airBreak.position.y - airBreak.speed * Math.cos(-(direction - Math.PI / 2)),
            z: 0
        };

        if (Utils.isNotKillZone(world, position))
        {
            airBreak.position.x = position.x;
            airBreak.position.y = position.y;

            airBreak.velocity.x -= physicsComponent.body.maxSpeedXY * Math.sin(-(direction - Math.PI / 2));
            airBreak.velocity.y -= physicsComponent.body.maxSpeedXY * Math.cos(-(direction - Math.PI / 2));
        }
    }

    if (KeyPressing.isKeyPressed(68 /*key: D*/) && Utils.isNotOpenChat())
    {
        let position =
        {
            x: airBreak.position.x + airBreak.speed * Math.sin(-(direction - Math.PI / 2)),
            y: airBreak.position.y + airBreak.speed * Math.cos(-(direction - Math.PI / 2)),
            z: 0
        };

        if (Utils.isNotKillZone(world, position))
        {
            airBreak.position.x = position.x;
            airBreak.position.y = position.y;

            airBreak.velocity.x += physicsComponent.body.maxSpeedXY * Math.sin(-(direction - Math.PI / 2));
            airBreak.velocity.y += physicsComponent.body.maxSpeedXY * Math.cos(-(direction - Math.PI / 2));
        }
    }

    if (KeyPressing.isKeyPressed(81 /*key: Q*/) && Utils.isNotOpenChat())
    {
        airBreak.position.z += airBreak.speed;
    }

    if (KeyPressing.isKeyPressed(69 /*key: E*/) && Utils.isNotOpenChat())
    {
        airBreak.position.z -= airBreak.speed;
    }

    if (KeyPressing.isKeyPressed(37 /*key: LEFT*/) && Utils.isNotOpenChat())
    {
        if (airBreak.speed > 1)
            airBreak.speed -= 2;
    }

    if (KeyPressing.isKeyPressed(39 /*key: RIGHT*/) && Utils.isNotOpenChat())
    {
        airBreak.speed += 2;
    }
if(airBreak.speed >= 200){
airBreak.speed = 200
}
    if (Utils.isParkourMode())
    {
        for (let i = 0; i < bodies.length; i++)
        {
            bodies.at(i).movable = false;
        }

        if (airBreak.antiAim)
        {
            let bounds = world.entities_0.array_hd7ov6$_0.at(0).components_0.array.at(0).bounds;

            physicsComponent.interpolatedPosition.x = Utils.getRandomArbitrary(bounds.minX, bounds.maxX);
            physicsComponent.interpolatedPosition.y = Utils.getRandomArbitrary(bounds.minY, bounds.maxY);
            physicsComponent.interpolatedPosition.z = Utils.getRandomArbitrary(bounds.maxZ + 500, bounds.maxZ + 500);
        }

        physicsComponent.body.state.position.x = airBreak.position.x;
        physicsComponent.body.state.position.y = airBreak.position.y;
    }
    else
    {
        physicsComponent.body.state.velocity.x = airBreak.velocity.x;
        physicsComponent.body.state.velocity.y = airBreak.velocity.y;
    }

    physicsComponent.body.state.position.z = airBreak.position.z;
    physicsComponent.body.state.velocity.z = airBreak.velocity.z;

    physicsComponent.body.state.orientation.w = Math.sin(-(camera.direction - Math.PI) / 2);
    physicsComponent.body.state.orientation.z = Math.cos(-(camera.direction - Math.PI) / 2);
    physicsComponent.body.state.orientation.x = 0;
    physicsComponent.body.state.orientation.y = 0;

    physicsComponent.body.state.angularVelocity.x = 0;
    physicsComponent.body.state.angularVelocity.y = 0;
    physicsComponent.body.state.angularVelocity.z = 0;
}


// striket.h.js

class Striker
{
    init = null; // args: 1 - localPlayer
    process = null; // args: 1 - localPlayer
}

// striker.c.js

let shellCache = null;
let state = false;
let salvoRocketsCount = 8;
let targetId;

Striker.init = function (localPlayer)
{
    if (!localPlayer)
    {
        return;
    }

    let world = GameObjects.getWorld();

    if (!world)
    {
        return;
    }

    let striker = GameObjects.getStrikerComponent();

    if (!striker)
    {
        return;
    }

    let targetingSystem = striker.targetingSystem_0.targetingSystem_vutpoz$_0;

    if (!targetingSystem)
    {
        targetingSystem = striker.targetingSystem_0.targetingSystem_0;
    }

    let targetingSectorsCalculator = targetingSystem.directionCalculator_0.targetingSectorsCalculator_0;

    if (targetingSectorsCalculator)
    {
        targetingSectorsCalculator.maxElevationAngle_0 = 100000;
        targetingSectorsCalculator.minElevationAngle_0 = -100000;
    }

    salvoRocketsCount = striker.salvoRocketsCount;

    striker.__proto__.lockTarget_gcez93$ = function (t, e, n)
    {
        if (e != null && e != localPlayer.at(4).userId)
        {
            targetId = e;
        }

        striker.stopAiming();
        t.targetId = localPlayer.at(4).userId;
        this.lockTarget_gcez93$$default(t, e);
        return true;
    }

    for (let i = 0; i < localPlayer.length; i++)
    {
        if (localPlayer.at(i).hasOwnProperty("shellCache_0"))
        {
            shellCache = localPlayer.at(i).shellCache_0.itemsInUse_123ot1$_0.array_hd7ov6$_0;
            break;
        }
    }
}

Striker.process = function (localPlayer)
{
    if (!localPlayer)
    {
        return;
    }

    let world = GameObjects.getWorld();

    if (!world)
    {
        return;
    }

    let striker = GameObjects.getStrikerComponent();

    if (!striker)
    {
        return;
    }

    striker.stopAiming();

    if (KeyPressing.isKeyPressed(82 /*key: R*/) && Utils.isNotOpenChat())
    {
        state = true;
    }

    if (shellCache)
    {
        if (shellCache.length == salvoRocketsCount)
        {
            setTimeout(() => { state = true; }, 1000);
        }

        let targetPos = { x: 0, y: 0, z: 0 };

        if (targetId)
        {
            let bodies = world.physicsScene_0.bodies_0.array_hd7ov6$_0;

            for (let i = 0; i < bodies.length; i++)
            {
                let idComponent = bodies.at(i).data.components_0.array;

                for (let i = 0; i < idComponent.length; i++)
                {
                    if (idComponent.at(i).hasOwnProperty("userId_dt4r72$_0"))
                    {
                        idComponent = idComponent.at(i);
                    }
                }

                if (idComponent && idComponent.hasOwnProperty("userId_dt4r72$_0"))
                {
                    if (idComponent.userId_dt4r72$_0 == targetId)
                    {
                        if (bodies.at(i).state.position)
                        {
                            targetPos = bodies.at(i).state.position;
                            break;
                        }
                    }
                }
            }
        }

        if (state)
        {
            for (let i = 0; i < shellCache.length; i++)
            {
                shellCache.at(i).components_0.array.at(1).direction.x = 0;
                shellCache.at(i).components_0.array.at(1).direction.y = 0;
                shellCache.at(i).components_0.array.at(1).direction.z = 0;

                if (targetPos)
                {
                    shellCache.at(i).components_0.array.at(1).position.x = targetPos.x;
                    shellCache.at(i).components_0.array.at(1).position.y = targetPos.y;
                    shellCache.at(i).components_0.array.at(1).position.z = targetPos.z;
                }
            }

            if (shellCache.length == 0)
            {
                state = false;
            }
        }
        else
        {
            for (let i = 0; i < shellCache.length; i++)
            {
                shellCache.at(i).components_0.array.at(1).direction.x = 0;
                shellCache.at(i).components_0.array.at(1).direction.y = 0;
                shellCache.at(i).components_0.array.at(1).direction.z = 0;
            }
        }
    }
}

// removeMines.h.js

class RemoveMines
{
    process = null; // args: 1 - localPlayer
}

// removeMines.c.js

RemoveMines.process = function (localPlayer)
{
    if (!localPlayer)
    {
        return;
    }

    let world = GameObjects.getWorld();

    if (!world)
    {
        return;
    }

    let mines = GameObjects.getMines();

    if (!mines)
    {
        return;
    }

    var n;
    for (n = mines.minesByUser_0.keys.iterator(); n.hasNext();)
    {
        var o = n.next();
        mines.removeAllMines_0(o)
    }

}

// clicker.h.js

class Clicker
{
    process = null; // args: 1 - localPlayer
}

// clicker.c.js

let autoMining = false

document.addEventListener('keyup', (e) =>
{
    if (e.keyCode == 53 && Utils.isGameReady() && Utils.isNotOpenChat())
    {
        autoMining = !autoMining;
    }
})

Clicker.process = function (localPlayer)
{
    if (!localPlayer)
    {
        return;
    }

    let world = GameObjects.getWorld();

    if (!world)
    {
        return;
    }

    let gameActions = GameObjects.getGameActions();

    if (!gameActions)
    {
        return;
    }

    let healthComponent = GameObjects.getHealthComponent();

    if (!healthComponent)
    {
        return;
    }

    if (Utils.isParkourMode() && !healthComponent.isFullHealth() && healthComponent.alive)
    {
        gameActions.at(5).at(1).wasPressed = true;
        gameActions.at(5).at(1).wasReleased = true;
        gameActions.at(9).at(1).wasPressed = true;
        gameActions.at(9).at(1).wasReleased = true;

        world.frameStartTime_0 += 5000000;

        world.inputManager.input.processActions_0();

        world.frameStartTime_0 -= 5000000;
    }

    gameActions.at(6).at(1).wasPressed = true;
    gameActions.at(6).at(1).wasReleased = true;

    gameActions.at(7).at(1).wasPressed = true;
    gameActions.at(7).at(1).wasReleased = true;

    gameActions.at(8).at(1).wasPressed = true;
    gameActions.at(8).at(1).wasReleased = true;

    if (autoMining)
    {
        gameActions.at(9).at(1).wasPressed = true;
        gameActions.at(9).at(1).wasReleased = true;
    }
}

// wallHack.h.js

class WallHack
{
    process = null; // args: 1 - localPlayer
}

// wallHack.c.js

colorEnemy = 10027085;
colorTarget = 6750054;

function drawEsp(player, color)
{
    let weaponSkin = player.at(7).weaponSkin_3qscef$_0.root_s4vp75$_0;
    let weaponChildren = weaponSkin.children_ich852$_0.array;

    let hullSkin = player.at(7).weaponSkin_3qscef$_0.hullSkinComponent_p2c7jk$_0.hull_tmiccz$_0;
    let hullChildren = hullSkin.children_ich852$_0.array;

    weaponSkin.outlined = true;
    weaponSkin.outlineBold = false;
    weaponSkin.outlineColor = color;

    hullSkin.outlined = true;
    hullSkin.outlineBold = false;
    hullSkin.outlineColor = color;

    for (let i = 0; i < weaponChildren.length; i++)
    {
        weaponChildren.at(i).outlined = true;
        weaponChildren.at(i).outlineBold = false;
        weaponChildren.at(i).outlineColor = color;
    }

    for (let i = 0; i < hullChildren.length; i++)
    {
        hullChildren.at(i).outlined = true;
        hullChildren.at(i).outlineBold = false;
        hullChildren.at(i).outlineColor = color;
    }
}

WallHack.process = function (localPlayer)
{
    if (!localPlayer)
    {
        return;
    }

    let world = GameObjects.getWorld();

    if (!world)
    {
        return;
    }

    let bodies = world.physicsScene_0.bodies_0.array_hd7ov6$_0;

    for (let i = 0; i < bodies.length; i++)
    {
        if (bodies.at(i).data.components_0.array.at(0).hasOwnProperty("team_1h5i78$_0") &&
        bodies.at(i).data.components_0.array.at(0).team_1h5i78$_0.hasOwnProperty("name$"))
        {
            if ((localPlayer.at(0).team_1h5i78$_0.name$ !=
            bodies.at(i).data.components_0.array.at(0).team_1h5i78$_0.name$) ||
            localPlayer.at(0).team_1h5i78$_0.name$ == "NONE")
            {
                let color = colorEnemy;

                if (bodies.at(i).data.components_0.array.at(4).userId == targetId)
                {
                    color = colorTarget;
                }

                drawEsp(bodies.at(i).data.components_0.array, color);
            }
        }
    }
}

let cheatMenuCode = `
<div class="shizoval" id="shizoval_window">

	<style>
        .shizoval {
            left: 1%;
            top: 15%;
            position: fixed;
            z-index: 1000;
            display: flex;
        }

        .shizoval__content {
            padding: 15px;
            background: rgba(12, 12, 12, 0.28);
            box-shadow: 0 5px 15px black;
            font-family: 'Roboto', sans-serif;
            color: white;
            font-size: 0.9375rem;
            font-weight: 500;
            border-radius: 15px;
            opacity: 0.75;
            backdrop-filter: blur (8px);
        }
	</style>

	<div class="shizoval__content">
		<center>shizoval</center><hr>

		<div id="gameStates" style="display: none;">
			<p>AirBreak: <font id="airBreakStateColor" color="red"><label id="airBreakState">FALSE</label></font></p>
			<p>AirBreak Speed: <font color="#e699ff"><label id="airBreakSpeed">100</label></font></p>
			<p>Anti-Aim: <font id="antiAimStateColor" color="red"><label id="antiAimState">FALSE</label></font></p>
			<p>Auto Mining: <font id="autoMiningStateColor" color="red"><label id="autoMiningState">FALSE</label></font></p>
		</div>

		<div id="infoWindow">
			<p>Free cheat for tanki online by sheezzmee</p>
			<p>Modified by Akz</p>
		</div>

	</div>

	<script>
		document.addEventListener('keyup', function (evt)
		{
			if (evt.keyCode === 45)
			{
				if (document.getElementById("shizoval_window").style.display == "none")
				{
					document.getElementById("shizoval_window").style.display = "";
				}
				else
				{
					document.getElementById("shizoval_window").style.display = "none";
				}
			}
		});
	</script>

</div>
`;

// cheatMenu.h.js

class CheatMenu
{
    init = null; // args: void
    setStates = null; // args: void
}

// cheatMenu.c.js

let airBreakObj;
let clickerObj;

CheatMenu.init = function ()
{
    $("body").append(cheatMenuCode);

    airBreakObj =
    {
        airBreakState:
        {
            color: document.getElementById("airBreakStateColor"),
            label: document.getElementById("airBreakState")
        },

        airBreakSpeed:
        {
            label: document.getElementById("airBreakSpeed")
        },

        antiAimState:
        {
            color: document.getElementById("antiAimStateColor"),
            label: document.getElementById("antiAimState")
        }
    };

    clickerObj =
    {
        autoMining:
        {
            color: document.getElementById("autoMiningStateColor"),
            label: document.getElementById("autoMiningState")
        }
    };
}

CheatMenu.setStates = function ()
{
    if (airBreakObj.airBreakState.label.textContent == "FALSE" && airBreak.state == true)
    {
        airBreakObj.airBreakState.label.textContent = "TRUE";
        airBreakObj.airBreakState.color.color = "green";
    }

    if (airBreakObj.airBreakState.label.textContent == "TRUE" && airBreak.state == false)
    {
        airBreakObj.airBreakState.label.textContent = "FALSE";
        airBreakObj.airBreakState.color.color = "red";
    }

    if (airBreakObj.airBreakSpeed.label.textContent != airBreak.speed)
    {
        airBreakObj.airBreakSpeed.label.textContent = airBreak.speed;
    }

    if (airBreakObj.antiAimState.label.textContent == "FALSE" && airBreak.antiAim == true)
    {
        airBreakObj.antiAimState.label.textContent = "TRUE";
        airBreakObj.antiAimState.color.color = "green";
    }

    if (airBreakObj.antiAimState.label.textContent == "TRUE" && airBreak.antiAim == false)
    {
        airBreakObj.antiAimState.label.textContent = "FALSE";
        airBreakObj.antiAimState.color.color = "red";
    }

    if (clickerObj.autoMining.label.textContent == "FALSE" && autoMining == true)
    {
        clickerObj.autoMining.label.textContent = "TRUE";
        clickerObj.autoMining.color.color = "green";
    }

    if (clickerObj.autoMining.label.textContent == "TRUE" && autoMining == false)
    {
        clickerObj.autoMining.label.textContent = "FALSE";
        clickerObj.autoMining.color.color = "red";
    }
}

// content.c.js

// Data
let init = false;

CheatMenu.init();

function reset()
{
    init = false;
    airBreak.state = false;

    document.getElementById("infoWindow").style.display = "";
    document.getElementById("gameStates").style.display = "none";

    gameObjects = 
    {
        localPlayer: null,
        world: null,
        gameActions: null,
        mines: null,
        physicsComponent: null,
        healthComponent: null,
        camera: null,
        strikerComponent: null
    };

    utilsObjects = 
    {
        rootElement: null,
        rootObject: null
    };
}

// Main event (call after initialization)
function mainEvent()
{
    try
    {
        if (!init && Utils.isGameReady())
        {
            init = true;
    
            // init code
            document.getElementById("infoWindow").style.display = "none";
            document.getElementById("gameStates").style.display = "";

            let localPlayer = GameObjects.getLocalPlayer();
                
            Striker.init(localPlayer);

            if (localPlayer)
            {
                localPlayer.at(37).runAfterPhysicsUpdate_mx4ult$ = function(t) 
                {
                    this.sendState_0(this.tankPhysicsComponent_0.getInterpolatedBodyState());
                }
            }
        }
        else if (init && !Utils.isGameReady())
        {
            reset();
        }
    
        if (init)
        {
            let localPlayer = GameObjects.getLocalPlayer();

            // process functions
            AirBreak.process(localPlayer);
            Clicker.process(localPlayer); 
            Striker.process(localPlayer);
            RemoveMines.process(localPlayer);
            WallHack.process(localPlayer);

            CheatMenu.setStates();
        }
    }   
    catch (e)
    {
        Utils.errorLog(e);
        reset();
    }

    requestAnimationFrame(mainEvent);
}

requestAnimationFrame(mainEvent);

console.clear();
console.log("[SHIZOVAL] The cheat has been loaded");
