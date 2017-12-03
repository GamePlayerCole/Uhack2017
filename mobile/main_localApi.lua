local json = require( "json" )
local widget = require( "widget" )
display.setStatusBar( display.DarkStatusBar )

function handleResponse( event )
 
    if not event.isError then
        local response = json.decode( event.response )
        print( event.response )
        print("\nNUMBER " .. #response.businesses)

        resturant = pickRandom(response.businesses)
    else
        print( "Error!" )
    end
    return
end
  


function pickRandom(rTable)
	local randomNum = math.random(1,#rTable)
	 pickedResturant = rTable[randomNum]
	presentResturant(pickedResturant)
end

function goToStart()
	button1:removeSelf()
	display.setStatusBar( display.DarkStatusBar )

	button1 = widget.newButton(
    		{
	       	 	width = 240,
	        	height = 240,
	        	defaultFile = "getButton.png",
	        	overFile = "getButton2.png",
	        	--label = "button",
	        	onEvent = handleGetResaurantButton
    		}
    
	)
	button1.alpha = 0
	button1.x = display.contentCenterX
	button1.y = display.contentCenterY + 200
	transition.to( name, {alpha = 0,y = name.y + 100, transition  = easing.inOutElastic } )
    	transition.to( bar, {alpha = 0,y = bar.y + 100, transition  = easing.inOutElastic } )
    	transition.to( address, {alpha = 0,y = address.y + 100, transition  = easing.inOutElastic } )
    	transition.to( retryButton, {alpha = 0,y = retryButton.y + 100, transition  = easing.inOutElastic } )
		transition.to( image, {alpha = 0,y = image.y + 100, transition  = easing.inOutElastic , onComplete = function()

			name:removeSelf()
			bar:removeSelf()
			address:removeSelf()
			retryButton:removeSelf()
			image:removeSelf()
			print("Y = "..button1.y)

			transition.to(about,{y = display.actualContentHeight - (display.actualContentHeight*.22),alpha = 1,transition = easing.inOutElastic, time = 1000 })
			transition.to(button1,{y = display.contentCenterY + 100,alpha = 1,transition = easing.inOutElastic, time = 1000 })
			transition.to(logo,{y = display.contentCenterY - 140,alpha = 1,transition = easing.inOutElastic, time = 1000 })

		end} )


end


function handleRetry(e)
	if(e.phase == "ended")then
		goToStart()
	end
end

function addressTouch(e)
	if(e.phase == "ended")then
		system.openURL( "https://www.google.com/maps/dir/" .. pickedResturant.coordinates.latitude..",".. pickedResturant.coordinates.longitude .."/"..lat..","..longitude)

	end
end

function networkListener( event )
    if ( event.isError ) then
        print ( "Network error - download failed" )
    else
    	display.setStatusBar( display.HiddenStatusBar )

        --event.target.alpha = 0
        
        transition.to( magic, {alpha = 0, time = 200, onComplete = function()
			magic:removeSelf()
        	magic = nil
        	Runtime:removeEventListener( "enterFrame", magicMove )
        end} )

        image =  event.target 
        image.alpha = 0
        image.y = image.y + 50
        bar = display.newRect(160, display.actualContentHeight, 500, 400 )
        bar.alpha = 0
    	transition.to( bar, {alpha = 1,y = bar.y - 100, transition  = easing.inOutElastic } )

       	name = display.newText( pickedResturant.name,display.contentCenterX, display.actualContentHeight - 180 )
		name.size = 20
		name.alpha = 0
    	transition.to( name, {alpha = 1,y = name.y - 100, transition  = easing.inOutElastic } )
		--name.align = "center"
		name:setFillColor(0,0,0 )

	 	--address = display.newText( pickedResturant.location.address1,display.contentCenterX, display.actualContentHeight - 80 , 300, 100 )
	 	local options1 = 
		{
		    text = pickedResturant.location.address1,
		    x = display.contentCenterX,
		    y = display.actualContentHeight - 140,
		    width = 300,
		    align = "center",
		    font = native.systemFont,
		    fontSize = 18,
		}

		address = display.newText( options1 )
		address:addEventListener( "touch", addressTouch )

	 	address.x = 160
		address.size = 14
		address.alpha = 0
    	transition.to( address, {alpha = 1,y = address.y - 100, transition  = easing.inOutElastic } )
		--name.align = "center"
		address:setFillColor(0,0,0 )

		retryButton = widget.newButton({width = 1500/6,
	        height = 500/6,
	        defaultFile = "nope.png",
	        overFile = "nope2.png",
	        --label = "button",
	        onEvent = handleRetry} )
		retryButton.alpha = 0 
		retryButton.x = 160 
		retryButton.y = display.actualContentHeight - 80
		timer.performWithDelay( 2000, function()
    			transition.to( retryButton, {alpha = 1,y = retryButton.y - 100, transition  = easing.inOutElastic } )
    		end
		 )

        while(image.height < display.actualContentHeight-100)do 

			ratio = (image.height/image.width)
			image.width = image.width + (image.width*.01)
			image.height = image.height + (image.height*.01)
		end

		transition.to( image, {alpha = 1,y = image.y - 100, transition  = easing.inOutElastic } )

        --transition.to( event.target, { alpha = 1.0 } )
    end

end

function presentResturant(r)

	Rimage = display.loadRemoteImage( r.image_url, "GET", networkListener, "rImage.png", system.TemporaryDirectory, display.contentCenterX, display.contentCenterY )
	
	
end

function removeMainMenu()
	transition.to(button1,{y = display.contentCenterY + 200,alpha = 0,transition = easing.inOutElastic, time = 1000 })
    transition.to(logo,{y = display.contentCenterY + 100,alpha = 0,transition = easing.inOutElastic, time = 1000 })
    transition.to(about,{y = display.actualContentHeight - (display.actualContentHeight*.22),alpha = 0,transition = easing.inOutElastic, time = 1000 })

end

function magicMove()
		if(magic)then
			magic.y = display.contentCenterY + ((math.sin(time)*20))
			time = time + .1
		end
end 


function showMagic()
	magic = display.newImage("magic.png")
	magic.width = 280
	magic.height = 280
	magic.x = display.contentCenterX
	magic.y = display.contentCenterY
	magic.alpha = 0

	timer.performWithDelay( 500, function()
		if(magic)then
			transition.to( magic, {alpha = 1 } )
			time = 0
			Runtime:addEventListener( "enterFrame", magicMove)
		end
	end)
		
end
 
function handleGetResaurantButton( event )
 
    if ( "ended" == event.phase ) then
    	removeMainMenu()
    	showMagic()
    	timer.performWithDelay( 1000, function()

    		network.request( "https://api.yelp.com/v3/businesses/search?latitude=" .. lat .. "&longitude=" .. longitude, "GET", handleResponse, {headers = {Authorization = ("Bearer " .. accessToken)}})
    	end
    	 )

    end
end

function handleAbout(e)
	if(e.phase == "ended")then
		print("about...")
		native.showAlert( "About Hungry Hub", "- Developed by Chase Morell, Nalin Suri, Andrew Gonzalez, Cole Hemp, and Simeon. \n- Uses Node.js, Yelp APIs, and Corona SDK. \n- University of Miami, UHACK 2017" , {"Dismiss"} )

end
end
 
function createUI()

	logo = display.newImage("logo.png")
	logo.width = 300
	logo.height = 300
	logo.x = display.contentCenterX
	logo.y = display.contentCenterY - 140

	 button1 = widget.newButton(
    {
	        width = 240,
	        height = 240,
	        defaultFile = "getButton.png",
	        overFile = "getButton2.png",
	        --label = "button",
	        onEvent = handleGetResaurantButton
    }
    
	)
 	button1.x = display.contentCenterX
	button1.y = display.contentCenterY + 100

	about = widget.newButton( {
	        width = 240,
	        height = 50,
	        --defaultFile = "getButton.png",
	       -- overFile = "getButton2.png",
	        label = "about",
	        id = "about",
	        onEvent = handleAbout
    })
    about.x = display.contentCenterX
	about.y = display.actualContentHeight - (display.actualContentHeight*.22)

end
bg = display.newRect( 160, 240, 500, 2000 )

createUI()
function authList(e)
        local response = json.decode( e.response )
        print("ACCESS TOKEN: " .. response.access_token)
        accessToken = response.access_token
end


function getAccessToken()
				clientID = "YOUR CLIENT ID"
				clientSecret = "YOUR CLIENT SECRET"
				network.request( "https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id="..clientID.."&client_secret="..clientSecret, "POST", authList )
end
getAccessToken();


function locationHandler(event)
	if(event.errorCode)then
		print("there is an error")
	else
		print("LONG: " .. event.longitude)
		print("LAT : " .. event.latitude)
		lat = event.latitude
		longitude = event.longitude

	end
end

Runtime:addEventListener( "location", locationHandler )

