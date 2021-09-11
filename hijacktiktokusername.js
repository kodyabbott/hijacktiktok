// Select the node that will be observed for mutations
var targetNode = document.querySelector('.webcast-chatroom-messages-list.is-not-lock');
var cursedSelector = '.webcast-chatroom-message-item.webcast-chatroom__chat-message.webcast-chatroom__room .webcast-chatroom__profile_wrapper .nickname';
// Options for the observer (which mutations to observe)
var config = { attributes: true, childList: true, subtree: true };
var lastMessage = '';
var messageNodeExtractor = function(domNode){
    var result = domNode.querySelector(cursedSelector);
    if(result){
        result = result.innerText;
    }
    return result; 
}
var emptyMessageFilter = function(message){
    return message;
}
// Callback function to execute when mutations are observed
var callback = function(mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for(var mutation of mutationsList) {
        if (mutation.type === 'childList') {
            var addedNodes = [ ...mutation.addedNodes];
            var messages = addedNodes.map(messageNodeExtractor);
            var filteredMessages = messages.filter(emptyMessageFilter);
            if(filteredMessages.length){
              console.log('Hijacked Username', filteredMessages);  
            }
        }
        else if (mutation.type === 'attributes') {
            console.log('The ' + mutation.attributeName + ' attribute was modified.');
        }
    }
};

// Create an observer instance linked to the callback function
var observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);

// Later, you can stop observing
// observer.disconnect();
