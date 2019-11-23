#对MVC和MVVM的理解
>MVC MVVM  MVP都是常见的软件架构设计模式通过分离关注点来改进代码的组织方式为了解决一类问题而总结出的抽象方法
##MVC
>MVC吧软件架构分为model  view controller
* model主要封装了应用程序需要的数据以及对数据处理的方法
* view 作为视图层主要负责数据展示和相应用户的操作交互
* controller 是model和view的纽带接受view传来的交互事件并且传递给model并且把model返回的最新模型数据返回给view层
###之间的数据关系
* view接受用户请求并把请求传递给controller层
* controller操作model进行数据更新
* 数据更新之后model通知view更新视图
* 视图更新
###缺点
* view对于model强依赖并且view可以直接操作model所以不可避免视图层可能会有大量的业务逻辑导致view层过重后期维护困难而且复用性比较低
* view和controller看似相互分离实则紧密联系经常是一一对应的关系解耦程度不足
##MVP
>MVP是对MVC的改良和MVC最大的区别是在MVP中view并不直接使用model他们之间的通信是通过Presenter 来完成所有的交互都发生在Presenter 内部
>而在MVC中view是直接去读取model数据
* model依然是封装业务需要的数据及对数据的处理
* view负责数据展示和响应交互但是view层并不直接依赖model
* presenter作为view和model的中间人view不能直接使用model而是通过present提供接口通过present去更新model再通过观察者模式去更新view
### 数据关系
* view接受用户请求并把请求转发给presenter
* presenter操作model进行数据更新
* model通知presenter数据发生变化
* presenter更新view ----双向通信
### MVC和MVP之间的关系
* MVP是MVC模式的变种
* 在项目开发中UI是容易变化且是多样的一样的数据会有N中显示方式,业务逻辑也是比较容易变化的,为了使项目拥有更大的弹性,
    我们期望吧UI 逻辑和数据分离开发MVP则是一种比较不错的选择
* presenter代替了MVC中的controller担当了比controller更多的任务也更加复杂presenter处理事件执行相应逻辑这些逻辑映射到model
    操作model呢么处理UI如何工作的代码就在presenter中
* MVC中的model和view通过观察者进行通信,MPV中的presenter和view则是通过中介进行数据通信基于设计和MVC相同model存储数据view对model的表现
     presenter协调两者之间的通信view接受到事件并且把事件传递给presenter如何处理这些事件相应UI更新都由presenter来完成
### MVP优点
* view和model相互分离,修改互不影响
* 更高效的使用,所有的逻辑都在presenter中完成
* 一个presenter可对应多个view提高可复用性
* 更便于测试 逻辑都放在presenter中可脱离接口进行测试    
###MVP缺点
* presenter中除了业务逻辑之外还有大量的model view同步逻辑造成presenter比较笨重,难以维护
##MVVM
> 在MVVM中不需要presenter手动同步model view之间的变化model一旦改变会自动刷新view view改变对应的model也会发生变化这种方式就可以在业务中只需要关心
>数据的运转而无需直接和页面打交道viewmodel只需要关心数据和业务处理而不需要关心view如何处理数据  view和model都可以独立出来 一方改变了不一定需要改变
>另一方也可以吧一些可复用的逻辑抽离出来放在viewmodel中
* model仅仅关心数据可以把它理解成一个json
* view通过模板语法以声明式的方式吧model中的数据渲染进dom中,当viewmodel对model进行更新的时候会通知数据绑定更新到view中
* viewmodel 对view层的生命进行处理当viewmodel中的数据发生变化view层会进行更新一旦view对绑定的数据进行操作则viewmodel相关的数据也会发生变化
###数据关系
* view接受用户请求并把请求转发给viewmodel
*viewmodel操作model进行更新更新完成之后通知viewmodel数据更新
* viewmodel操作view更新视图
###MVVM优点
* 低耦合view独立于model的变化和修改一个viewmodel可以绑定到不同的view上当view变化的时候model可以不变反之亦然
*可重用把一些视图逻辑放在viewmodel中
*开发人员可专注于业务和数据开发
可测试 可针对viewmodel进行测试
###MVVM缺点
* viewmodel会越来越庞大

