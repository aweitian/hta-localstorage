(function (ns) {
	var storage = {}
	var shell = new ActiveXObject('WScript.Shell')
	var storageFile = shell.ExpandEnvironmentStrings('%USERPROFILE%') + '\\.hta-localstorage'

	var fso = new ActiveXObject('Scripting.FileSystemObject')
	if (fso.FileExists(storageFile)) {
	  var fp = fso.OpenTextFile(storageFile, 1)
	  var json = fp.ReadAll()
	  try {
	    storage = JSON.parse(json)
	  }
	  catch (e) {
	    // Tampered with? Ignore invalid JSON
	  }
	  finally {
	    fp.Close()
	  }
	}

	var save = function () {
	  var fp = fso.OpenTextFile(storageFile, 2, true)
	  fp.Write(JSON.stringify(storage))
	  fp.Close()
	}
	var ls = {};
	ls.getItem = function (key) {
		return storage[key] || undefined
	}

	ls.setItem = function (key, value) {
		storage[key] = String(value)
		save()
	}

	ls.removeItem = function (key) {
		delete storage[key]
		save()
	}

	ls.clear = function () {
		storage = {}
		save()
	}
	window[ns] = ls;
})('ls');

//ls.setItem('foo','bar');
//alert(ls.getItem('foo'))
