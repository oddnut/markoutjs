/**
 * MarkoutJS - An API for creating DOM nodes in JavaScript
 * 
 * Oddnut Software
 * Copyright (c) 2009-2011 Eric Ferraiuolo - http://eric.ferraiuolo.name
 */

(function(global, document){

	var Markout, XHTMLTags, i;
	
	Markout = function( container ) {
		
		// make the constructor an optional factory
		if ( ! (this instanceof arguments.callee) ) {
			return new arguments.callee( container );
		}
		
		// check that container is an Element or DocumentFragment Node
		if ( container && ( container.nodeType === 1 || container.nodeType === 11 ) ) {
			this._node = container;
		} else {
			this._node = this._doc.createDocumentFragment();
		}
		
	};
	
	Markout.prototype = {
	
		getDOMNode : function() {
			
			return this._node;
		},
		
		el : function( element, attrs ) {
			
			var childHTML;
			
			// create a new Element Node or use the one passed
			element = typeof element === 'string' ? this._doc.createElement( element ) : element;
			if ( element.nodeType !== 1 ) {
				return this;
			}
			
			// create a new HTML instance with the element as the container
			childHTML = this._createChild( element );
			childHTML.attrs( attrs );
			this._node.appendChild( childHTML.getDOMNode() );
			
			return childHTML;
		},
		
		attrs : function( attrs ) {
			
			var node = this._node,
				key;
			attrs = attrs || {};
			
			for ( key in attrs ) {
				if ( node[key] !== undefined ) {
					node[key] = attrs[key];
				}
			}
		},
		
		text : function() {
			
			var args, textNode, i;
			
			// check for an array being passed
			if ( Object.prototype.toString.call( arguments[0] ) === '[object Array]' ) {
				args = arguments[0];
			} else {
				args = [];
				for ( i = 0; i < arguments.length; i++ ) {
					args.push( arguments[i] );
				}
			}
			
			// append the Text Node to the container
			textNode = this._doc.createTextNode( args.join('') );
			this._node.appendChild( textNode );
			
			return textNode;
		},
		
		space : function() {
			
			return this.text(' ');
		},
		
		_doc : document,
		
		_createChild : function( element ) {
			
			return new Markout( element );
		}
		
	};
	
	Markout.addElShorthand = function( tag ) {
		
		Markout.prototype[ tag ] = function( attrs ) { return this.el( tag, attrs ); };
	};
	
	XHTMLTags = [
		'a', 'abbr', 'acronym', 'address', 'area',
		'b', 'base', 'bdo', 'big', 'blockquote', /*'body',*/ 'br', 'button',
		'caption', 'cite', 'code', 'col', 'colgroup',
		'dd', 'del', 'dfn', 'div', 'dl', 'dt',
		'em',
		'fieldset', 'form',
		'h1', 'h2', 'h3', 'h4', 'h5', 'h6', /*'head',*/ 'hr', /*'html',*/
		'i', 'img', 'input', 'ins',
		'kbd',
		'label', 'legend', 'li', 'link',
		'map', 'meta',
		/*'noscript',*/
		'object', 'ol', 'optgroup', 'option',
		'p', 'param', 'pre',
		'q',
		'samp', 'script', 'select', 'small', 'span', 'strong', 'style', 'sub', 'sup',
		'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'title', 'tr', 'tt',
		'ul'
		/*'var'*/
	];
	
	for ( i = 0; i < XHTMLTags.length; i++ ) {
		Markout.addElShorthand( XHTMLTags[i] );
	}
	
	global.Markout = Markout;

}(window, window.document));
