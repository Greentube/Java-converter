var org_apache_hadoop_examples_dancing_Pentomino$24$SolutionPrinter = 
{
    $: function()
    {
        this.width = 0;
        this.height = 0;
    }
    ,
};
_class(org_apache_hadoop_examples_dancing_Pentomino$24$SolutionPrinter, java_lang_Object, [org_apache_hadoop_examples_dancing_DancingLinks$24$SolutionAcceptor],
"org.apache.hadoop.examples.dancing.Pentomino.SolutionPrinter" //replace-me-with-empty-string-for-production//
,{
    _2: function(width,height)
    {
        this.width = width;
        this.height = height;
        return this;
    }
    ,
    solution_1: function(names)
    {
        java_lang_System.out.println_1(org_apache_hadoop_examples_dancing_Pentomino.stringifySolution_3(this.width,this.height,names));
    }
    ,
});
//reference// org/apache/hadoop/examples/dancing/Pentomino
//reference// java/lang/System
//load// java/lang/Object
//load// org/apache/hadoop/examples/dancing/DancingLinks$SolutionAcceptor
