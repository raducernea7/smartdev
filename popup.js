```javascript
let comments = {};

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('saveButton').addEventListener('click', saveComment);
    document.getElementById('optionsButton').addEventListener('click', openOptions);
    loadComments();
});

function saveComment() {
    let commentInput = document.getElementById('commentInput');
    let comment = commentInput.value.trim();
    if (comment) {
        let url = window.location.href;
        let timestamp = new Date().toISOString();
        if (!comments[url]) {
            comments[url] = [];
        }
        comments[url].push({ comment, timestamp });
        chrome.storage.sync.set({ comments }, function() {
            commentInput.value = '';
            loadComments();
        });
    }
}

function loadComments() {
    let url = window.location.href;
    chrome.storage.sync.get('comments', function(data) {
        comments = data.comments || {};
        let commentList = document.getElementById('commentList');
        commentList.innerHTML = '';
        (comments[url] || []).forEach(function(commentObj) {
            let commentElement = document.createElement('div');
            commentElement.textContent = `${commentObj.comment} (${commentObj.timestamp})`;
            commentList.appendChild(commentElement);
        });
    });
}

function openOptions() {
    chrome.runtime.openOptionsPage();
}
```