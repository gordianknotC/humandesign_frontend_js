<template>
   <!--
     Replace following "div" with
     "<router-view class="layout-view">" component
     if using subRoutes
   -->
   <section class="layout-Main">
      <div v-if="showDevice" class="headerLoader-device  block-center deviceInfo ">
         <p>debug@ windows width:{{width}}, height:{{height}} device: {{device}}</p>
      </div>
      <loaderComp :dataScope="'.layout-Main'" :dataHolder="getCurrent"></loaderComp>
      <router-view></router-view>
   </section>

</template>




<script>
   import quasar from 'quasar'
   import mixin from '../vueMixin_addon'
   import router from '../router'
   import loaderComp from '../components/loaderComp.vue'
   import {TConsole, eCOLORS, TConsole_instances} from '../console_addon'
   import {_} from '../lodash_addon'
   import {mapState, mapMutations} from 'vuex'
   import {
      DEVICES, platform, select, orientible, is_mobile, PIX_RATIO, is_desktop_mode,
      printPlatformInfo, findIndexWhen, getClassRule, parseUnit, getCssClasses
   } from '../Utils.js'

   const Log         = new TConsole('Index', eCOLORS.current, [/VueComponent./, 'Index.'])
   const deviceDebug = false

   Log.suppressLevel([eCOLORS.info, eCOLORS.log, eCOLORS.debug])
   Log.disable = true
   //NOTE: disable all logs
   _.forEach(TConsole_instances, (value, key)=>{
      value.disable = true
   })
   window.quasar = quasar
   printPlatformInfo()


   // =================================================
   // NOTE: Routing Guards                            :
   // -------------------------------------------------
   /*
   to: Route: the target Route Object being navigated to.
   from: Route: the current route being navigated away from.
   next: Function: this function must be called to resolve the hook.
         The action depends on the arguments provided to next:

   next(): move on to the next hook in the pipeline. If no hooks are left, the navigation is confirmed.
   next(false): abort the current navigation. If the browser URL was changed (either manually by the
                user or via back button), it will be reset to that of the from route.
   next('/') or next({ path: '/' }): redirect to a different location. The current navigation will be
                                     aborted and a new one will be started.
   next(error): (2.4.0+) if the argument passed to next is an instance of Error, the navigation will be
                aborted and the error will be passed to callbacks registered via router.onError().
    */
   router.afterEach((to, from) => {
      Log.l('afterEach:', 'to:', to, 'from:', from)
   })
   router.beforeEach((to, from, next) => {
      let fromComp   = router.app.$refs[`app.router.${from.name}`],
          toComp = router.app.$refs[`app.router.${to.name}`]
      let indexState = router.app.$store.state.index
      Log.l('beforeEach:', 'to:', to, 'from:', from, 'toComp:', toComp, 'fromComp:', fromComp)
      if (to.name !== undefined) {
         if (indexState.ui !== 'loading_' + to.name) {
            router.app.$store.commit('index/loading', {name:to.name})
         }
      }
      next()
   })
   function __remoteDebug__() {
      /* jshint browser:true, evil:true */
      const ID       = '95e24583-a3d4-468b-bc06-c0a705baf19b'
      const ADDRESS  = 'http://192.168.42.192:8000'
      // 1. create iframe pointing to script on jsconsole.com domain
      // 2. create console object with: log, dir, etc?
      // 3. console.log runs postMessage with json.stringified content
      // 4. jsconsole.com/remote/?id.onMessage = send to server, and wait for response.

      function sortci(a, b) {
         return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
      }

      // from console.js
      function stringify(o, simple, counter=0) {
         return o.toString()
         var json = '', i, type = ({}).toString.call(o), parts = [], names = [];
         counter ++
         if (type === '[object String]'  && counter < 10) {
            json = '"' + o.replace(/\n/g, '\\n').replace(/"/g, '\\"') + '"';
         } else if (type === '[object Array]'  && counter < 10) {
            json = '[';
            for (i = 0; i < o.length; i++) {
               parts.push(stringify(o[i], simple, counter));
            }
            json += parts.join(', ') + ']';
         } else if (type === '[object Object]' && counter < 10) {
            json = '{';
            for (i in o) {
               names.push(i);
            }
            names.sort(sortci);
            for (i = 0; i < names.length; i++) {
               parts.push(stringify(names[i], undefined, counter) + ': ' + stringify(o[names[i] ], simple, counter));
            }
            json += parts.join(', ') + '}';
         } else if (type === '[object Number]') {
            json = o+'';
         } else if (type === '[object Boolean]') {
            json = o ? 'true' : 'false';
         } else if (type === '[object Function]') {
            json = o.toString();
         } else if (o === null) {
            json = 'null';
         } else if (o === undefined) {
            json = 'undefined';
         } else if (simple === undefined) {
            json = type + '{\n';
            for (i in o) {
               names.push(i);
            }
            names.sort(sortci);
            for (i = 0; i < names.length; i++) {
               // safety from max stack
               parts.push(names[i] + ': ' + stringify(o[names[i]], true, counter));
            }
            json += parts.join(',\n') + '\n}';
         } else {
            try {
               json = o+''; // should look like an object
            } catch (e) {}
         }
         return json;
      }

      function getRemoteScript() {
         return ADDRESS + '/js/remote.js?' + ID
         var scripts = document.getElementsByTagName('script');
         var remoteScript = scripts[scripts.length-1];
         var re = /jsconsole\..*(:\d+)?\/js\/remote.js/;
         for (var i = 0; i < scripts.length; i++) {
            if (re.test(scripts[i].src)) {
               remoteScript = scripts[i];
               break;
            }
         }

         return remoteScript;
      }


      var lastSrc = getRemoteScript(),
          id = lastSrc.replace(/.*\?/, ''),
          protocol = /https?:\/\//.exec(lastSrc)[0],
          origin = protocol + lastSrc.substr(protocol.length).replace(/\/.*$/, ''),
          remoteWindow = null,
          queue = [],
          msgType = '';

      var remoteFrame = document.createElement('iframe');
      remoteFrame.style.display = 'none';
      remoteFrame.src = origin + '/remote.html?' + id;

      // an attempt to allow this code to be included in the head element
      document.documentElement.appendChild(remoteFrame);

      window.addEventListener('message', function (event) {
         if (event.origin !== origin) {
            return;
         }

         // this isn't for us
         if (typeof event.data !== 'string') {
            return;
         }

         // eval the event.data command
         try {
            if (event.data.indexOf('console.log') === 0) {
               eval('remote.echo(' + event.data.match(/console.log\((.*)\);?/)[1] + ', "' + event.data + '", true)');
            } else {
               // must be undefined to work
               remote.echo(eval(event.data), event.data, undefined);
            }
         } catch (e) {
            _console.log(e.stack, event);
            remote.error(e, event.data);
         }
      }, false);

      var timers = {}; // timers for console.time and console.timeEnd

      var remote = {
         log: function () {
            // var argsObj = stringify(arguments.length === 1 ? arguments[0] : [].slice.call(arguments, 0));
            //window._console.log(arguments)
            var response = [];
            [].forEach.call(arguments, function (args) {
               response.push(stringify(args, true));
            });

            var msg = JSON.stringify({ response: response, cmd: 'remote console.log', type: msgType });

            if (remoteWindow) {
               remoteWindow.postMessage(msg, origin);
            } else {
               queue.push(msg);
            }

            msgType = '';
         },
         info: function () {
            msgType = 'info';
            //window._console.info(arguments)
            remote.log.apply(this, arguments);
         },
         echo: function () {
            var args = [].slice.call(arguments, 0),
                plain = args.pop(),
                cmd = args.pop(),
                response = args;

            var argsObj = stringify(response, plain),
                msg = JSON.stringify({ response: argsObj, cmd: cmd });
            if (remoteWindow) {
               remoteWindow.postMessage(msg, origin);
            } else {
               queue.push(msg);
            }
         },
         error: function (error, cmd) {
            //window._console.error(error, cmd)
            var msg = JSON.stringify({ response: error.message, cmd: cmd, type: 'error' });
            if (remoteWindow) {
               remoteWindow.postMessage(msg, origin);
            } else {
               queue.push(msg);
            }
         },
         time: function(title){
            if(typeof title !== 'string') {
               return;
            }
            timers[title] = +new Date();
         },
         timeEnd: function(title){
            if (typeof title !== 'string' || !timers[title]) {
               return;
            }
            var execTime = +new Date() - timers[title];
            delete timers[title];
            var plain = title + ': ' + execTime + 'ms';
            var msg = JSON.stringify({ response: plain, cmd:  'remote console.log', type: '' });
            if (remoteWindow) {
               remoteWindow.postMessage(msg, origin);
            } else {
               queue.push(msg);
            }
         },
         assert: function(condition, object){
            //window._console.assert(condition, object)
            if(!condition) {
               remote.log(arguments.length);
               var message = 'Assertion failed';
               if (object) {
                  message += ': ' + stringify(object);
               }
               remote.log(message)
               remote.error({ message: message });
            }
         }
      };

      // just for extra support
      remote.debug = remote.dir = remote.log;
      remote.warn = remote.info;

      remoteFrame.onload = function () {
         remoteWindow = remoteFrame.contentWindow;
         remoteWindow.postMessage('__init__', origin);

         remoteWindow.postMessage(stringify({ response: 'Connection established with ' + window.location.toString() + '\n' + navigator.userAgent, type: 'info' }), origin);

         for (var i = 0; i < queue.length; i++) {
            remoteWindow.postMessage(queue[i], origin);
         }
      };

      window.remote = remote;

      if (window.addEventListener) {
         window.addEventListener('error', function (event) {
            remote.error({ message: event.message }, event.filename + ':' + event.lineno);
         }, false);
      }


      try {
         window._console = window.console;
         window.console = remote;
      } catch (e) {
         console.log('cannot overwrite existing console object');
      }

      function warnUsage() {
         var useSS = false;
         try {
            sessionStorage.getItem('foo');
            useSS = true;
         } catch (e) {}
         if (!(useSS ? sessionStorage.jsconsole : window.name)) {
            if (useSS) {
               sessionStorage.jsconsole = 1;
            } else {
               window.name = 1;
            }
            alert('You will see this warning once per session.\n\nYou are using a remote control script on this site - if you accidently push it to production, anyone will have control of your visitor\'s browser. Remember to remove this script.');
         }
      }
      console.log('INIT')
      warnUsage();
   }
   //===================================================
   //NOTE: Code Start                                  :
   //---------------------------------------------------
   export default {
      components: {
         loaderComp:loaderComp
      },
      data () {
         return {
            name          : 'index',
            orienting     : window.DeviceOrientationEvent && !platform.is.desktop,
            rotating      : window.DeviceMotionEvent && !platform.is.desktop,
            platform      : platform,
            width         : window.innerWidth,
            height        : window.innerHeight,
            device        : this.getDeviceByWindowSize(), pat: [333, 333],
            showDevice    : deviceDebug,
            loader        : null,
            // NOTE: comp
         }
      },

      computed: {
         position () {

         },

      },
      // FIXME: 因為實作onAllComponentsLoaded必需在beforeMount時 (commit loading) Mounted後 (commit loaded)
      // FIXME: Caveats: can't implement beforeMount and beforeDestroy in component
      // FIXME: methods for preventing overrides loading states detection
      mixins  : [mixin],
      methods : {
         getDeviceByWindowSize(){
            let ret = findIndexWhen(DEVICES.byWidth, window.innerWidth, (window_width, value_, last) => {
               value_ = value_.size[0]
               if (window_width === value_) return true
               if (window_width > value_) {
                  if (value_ === last.size[0]) return true
               } else {
                  return true
               }
            })

            let ret2 = findIndexWhen(_.values(DEVICES.byRange), window.innerWidth, (window_width, value_, last) => {
               if (window_width === value_) return true
               if (window_width > value_) {
                  if (value_ === last) return true
               } else {
                  return true
               }
            })
            return ret.name + ", " + _.findKey(DEVICES.byRange, (o) => {
                  return o === ret2
               })
         },
         onWindowResize(evt){
            this.width  = window.innerWidth
            this.height = window.innerHeight
            this.device = this.getDeviceByWindowSize()
         },
         load(name){
            Log.l('router.push:', name)
            router.push({name: name})
         },
         // NOTE: comp
         loaded(param){
            let t   = new Date().getTime()
            let div = t - this.loader.timeStamp
            Log.l(param,t - this.loader.timeStamp)
            if (div < 2800){
               _.scheduleOnce(this.loaded, 200, {args:[param]})
            }else {
               this.$el.classList.remove('loaded')
               this.loader.loaded(param)
//               _.scheduleOnce(this.loader.loaded, 50, {args:[param]})
            }
         },
         init(param){
            _.scheduleOnce(this.$store.commit, 500, {args: ['index/loaded', param]})
         },
         // NOTE: comp
         loading(param){
            // reset cache of getClassRule
            this.loader.loading(param)
         },
         getCurrent(){
            return this
         }
      },
      mounted () {
         // defined in mixin
         Log.l()
         Log.l(platform)
//         window.platform = platform
//         window.printPlatformInfo = printPlatformInfo
//         window.__remoteDebug__ = __remoteDebug__
//         if ( ['win', 'android'].indexOf(platform.is.platform) === -1){
//            __remoteDebug__()
//         }
         this.addEventListener(window, 'resize', this.onWindowResize)
         this.loader = this.$root.$refs['app.router.index.loaderComp'][0]
         this.loading(this.$router.history.current)
      }
   }

</script>

<style lang="stylus">
   @import "../themes/comp.layout_index.styl"
</style>
