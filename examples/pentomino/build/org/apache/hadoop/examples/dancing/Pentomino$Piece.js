var org_apache_hadoop_examples_dancing_Pentomino$24$Piece = 
{
    $: function()
    {
        this.name = null;
        this.shape = null;
        this.rotations = null;
        this.flippable = false;
    }
    ,
};
_class(org_apache_hadoop_examples_dancing_Pentomino$24$Piece, java_lang_Object, [org_apache_hadoop_examples_dancing_Pentomino$24$ColumnName],
"org.apache.hadoop.examples.dancing.Pentomino.Piece" //replace-me-with-empty-string-for-production//
,{
    _4: function(name,shape,flippable,rotations)
    {
        this.name = name;
        this.rotations = rotations;
        this.flippable = flippable;
        var parser = shape.split_1("/");
        var lines = (new java_util_ArrayList.$())._0();
        for (var l = 0; l < parser.length; l=(l +1)|0) 
        {
            var token = parser[l];
            var line = _dim("Z",1,[token.length_0(),],false);
            for (var i = 0; i < line.length; i=(i +1)|0) 
            {
                line[i] = token.charAt_1(i) === 120;
            }
            lines.add_1(line);
        }
        this.shape = _dim("Z",2,[lines.size_0(),],null);
        for (var i = 0; i < lines.size_0(); i=(i +1)|0) 
        {
            this.shape[i] = _checkarray(lines.get_1(i),"Z",1);
        }
        return this;
    }
    ,
    getName_0: function()
    {
        return this.name;
    }
    ,
    getRotations_0: function()
    {
        return this.rotations;
    }
    ,
    getFlippable_0: function()
    {
        return this.flippable;
    }
    ,
    doFlip_3: function(flip,x,max)
    {
        if (flip) 
        {
            return ((((max - x)|0) - 1)|0);
        }
        else {
            return x;
        }
    }
    ,
    getShape_2: function(flip,rotate)
    {
        var result = null;
        if (rotate % 2 === 0) 
        {
            var height = this.shape.length;
            var width = this.shape[0].length;
            result = _dim("Z",2,[height,],null);
            var flipX = rotate === 2;
            var flipY = flip ^ (rotate === 2);
            for (var y = 0; y < height; y=(y +1)|0) 
            {
                result[y] = _dim("Z",1,[width,],false);
                for (var x = 0; x < width; x=(x +1)|0) 
                {
                    result[y][x] = this.shape[this.doFlip_3(flipY,y,height)][this.doFlip_3(flipX,x,width)];
                }
            }
        }
        else {
            var height = this.shape[0].length;
            var width = this.shape.length;
            result = _dim("Z",2,[height,],null);
            var flipX = rotate === 3;
            var flipY = flip ^ (rotate === 1);
            for (var y = 0; y < height; y=(y +1)|0) 
            {
                result[y] = _dim("Z",1,[width,],false);
                for (var x = 0; x < width; x=(x +1)|0) 
                {
                    result[y][x] = this.shape[this.doFlip_3(flipX,x,width)][this.doFlip_3(flipY,y,height)];
                }
            }
        }
        return result;
    }
    ,
});
//reference// java/util/ArrayList
//load// java/lang/Object
//load// org/apache/hadoop/examples/dancing/Pentomino$ColumnName
