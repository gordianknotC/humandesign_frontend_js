/**
 * Created by gordianknot on 7/14/2017.
 */


class ErrorMsg extends Error {
   constructor(message) {
      super(message)
      this.name = this.constructor.name
      if (typeof Error.captureStackTrace === 'function') {
         Error.captureStackTrace(this, this.constructor)
      } else {
         this.stack = (new Error(message)).stack
      }
   }
}


class ComponentNotLoadedProperly_Exception extends ErrorMsg {
   constructor(comp, components) {
      const message1 = `component "${comp.name}" should commit loading before mounted! this maybe caused by omitting to extend loading mutation to your component, or caused by overriden beforeMount behavior since loading detection was implemented inside beforeMount section`
      const message2 = comp.mixins === undefined ? "\nto infer what's entail this message, maybe you forget" +
         " to extend mixin addon" : ""
      super(message1 + message2)
      console.error('component:', comp, 'comp.mixin', comp.mixin)
      console.error('state.components:', components)
   }
}


class ComponentNameNotSpecified_Exception extends ErrorMsg {
   constructor(comp) {
      const message1 = `component "${comp.name}" for accessing components by "name", your should specify "name" property in data object of every vue compoennt`
      const message2 = comp.mixins === undefined ? "\nto infer what's entail this message, maybe you forget" + " to extend mixin addon" : ""
      super(message1 + message2)
      console.error('component:', comp, 'comp.mixin', comp.mixin)
   }
}


export{
   ComponentNameNotSpecified_Exception,
   ComponentNotLoadedProperly_Exception, ErrorMsg
}