var org_apache_hadoop_examples_dancing_DancingLinks = 
{
    $: function()
    {
        this.head = null;
        this.columns = null;
    }
    ,
};
_class(org_apache_hadoop_examples_dancing_DancingLinks, java_lang_Object, null,
"org.apache.hadoop.examples.dancing.DancingLinks" //replace-me-with-empty-string-for-production//
,{
    _0: function()
    {
        this.head = (new org_apache_hadoop_examples_dancing_DancingLinks$24$ColumnHeader.$())._2(null,0);
        this.head.left = this.head;
        this.head.right = this.head;
        this.head.up = this.head;
        this.head.down = this.head;
        this.columns = (new java_util_ArrayList.$())._0();
        return this;
    }
    ,
    addColumn_2: function(name,primary)
    {
        var top = (new org_apache_hadoop_examples_dancing_DancingLinks$24$ColumnHeader.$())._2(name,0);
        top.up = top;
        top.down = top;
        if (primary) 
        {
            var tail = this.head.left;
            tail.right = top;
            top.left = tail;
            top.right = this.head;
            this.head.left = top;
        }
        else {
            top.left = top;
            top.right = top;
        }
        this.columns.add_1(top);
    }
    ,
    addColumn_1: function(name)
    {
        this.addColumn_2(name,true);
    }
    ,
    getNumberColumns_0: function()
    {
        return this.columns.size_0();
    }
    ,
    getColumnName_1: function(index)
    {
        return this.columns.get_1(index).name.toString_0();
    }
    ,
    addRow_1: function(values)
    {
        var prev = null;
        for (var i = 0; i < values.length; i=(i +1)|0) 
        {
            if (values[i]) 
            {
                var top = this.columns.get_1(i);
                top.size = (((top.size)+(1))|0);
                var bottom = top.up;
                var node = (new org_apache_hadoop_examples_dancing_DancingLinks$24$Node.$())._5(null,null,bottom,top,top);
                bottom.down = node;
                top.up = node;
                if (prev !== null) 
                {
                    var front = prev.right;
                    node.left = prev;
                    node.right = front;
                    prev.right = node;
                    front.left = node;
                }
                else {
                    node.left = node;
                    node.right = node;
                }
                prev = node;
            }
        }
    }
    ,
    findBestColumn_0: function()
    {
        var lowSize = 2147483647;
        var result = null;
        var current = _checkclass(this.head.right,org_apache_hadoop_examples_dancing_DancingLinks$24$ColumnHeader);
        while (current !== this.head) 
        {
            if (current.size < lowSize) 
            {
                lowSize = current.size;
                result = current;
            }
            current = _checkclass(current.right,org_apache_hadoop_examples_dancing_DancingLinks$24$ColumnHeader);
        }
        return result;
    }
    ,
    coverColumn_1: function(col)
    {
        col.right.left = col.left;
        col.left.right = col.right;
        var row = col.down;
        while (row !== col) 
        {
            var node = row.right;
            while (node !== row) 
            {
                node.down.up = node.up;
                node.up.down = node.down;
                node.head.size = (((node.head.size)-(1))|0);
                node = node.right;
            }
            row = row.down;
        }
    }
    ,
    uncoverColumn_1: function(col)
    {
        var row = col.up;
        while (row !== col) 
        {
            var node = row.left;
            while (node !== row) 
            {
                node.head.size = (((node.head.size)+(1))|0);
                node.down.up = node;
                node.up.down = node;
                node = node.left;
            }
            row = row.up;
        }
        col.right.left = col;
        col.left.right = col;
    }
    ,
    getRowName_1: function(row)
    {
        var result = (new java_util_ArrayList.$())._0();
        result.add_1(row.head.name);
        var node = row.right;
        while (node !== row) 
        {
            result.add_1(node.head.name);
            node = node.right;
        }
        return result;
    }
    ,
    search_2: function(partial,output)
    {
        var results = 0;
        if (this.head.right === this.head) 
        {
            var result = (new java_util_ArrayList.$())._0();
            for (var row, row_i=partial.iterator_0(); row_i.hasNext_0()&&((row=row_i.next_0())||true);)
            {
                result.add_1(this.getRowName_1(row));
            }

            output.solution_1(result);
            results = (((results)+(1))|0);
        }
        else {
            var col = this.findBestColumn_0();
            if (col.size > 0) 
            {
                this.coverColumn_1(col);
                var row = col.down;
                while (row !== col) 
                {
                    partial.add_1(row);
                    var node = row.right;
                    while (node !== row) 
                    {
                        this.coverColumn_1(node.head);
                        node = node.right;
                    }
                    results = (((results)+(this.search_2(partial,output)))|0);
                    partial.remove_1(((partial.size_0() - 1)|0));
                    node = row.left;
                    while (node !== row) 
                    {
                        this.uncoverColumn_1(node.head);
                        node = node.left;
                    }
                    row = row.down;
                }
                this.uncoverColumn_1(col);
            }
        }
        return results;
    }
    ,
    searchPrefixes_3: function(depth,choices,prefixes)
    {
        if (depth === 0) 
        {
            prefixes.add_1(choices.clone_0());
        }
        else {
            var col = this.findBestColumn_0();
            if (col.size > 0) 
            {
                this.coverColumn_1(col);
                var row = col.down;
                var rowId = 0;
                while (row !== col) 
                {
                    var node = row.right;
                    while (node !== row) 
                    {
                        this.coverColumn_1(node.head);
                        node = node.right;
                    }
                    choices[((choices.length - depth)|0)] = rowId;
                    this.searchPrefixes_3(((depth - 1)|0),choices,prefixes);
                    node = row.left;
                    while (node !== row) 
                    {
                        this.uncoverColumn_1(node.head);
                        node = node.left;
                    }
                    row = row.down;
                    rowId = (((rowId)+(1))|0);
                }
                this.uncoverColumn_1(col);
            }
        }
    }
    ,
    split_1: function(depth)
    {
        var choices = _dim("I",1,[depth,],0);
        var result = (new java_util_ArrayList.$())._0();
        this.searchPrefixes_3(depth,choices,result);
        return result;
    }
    ,
    advance_1: function(goalRow)
    {
        var col = this.findBestColumn_0();
        if (col.size > 0) 
        {
            this.coverColumn_1(col);
            var row = col.down;
            var id = 0;
            while (row !== col) 
            {
                if (id === goalRow) 
                {
                    var node = row.right;
                    while (node !== row) 
                    {
                        this.coverColumn_1(node.head);
                        node = node.right;
                    }
                    return row;
                }
                id = (((id)+(1))|0);
                row = row.down;
            }
        }
        return null;
    }
    ,
    rollback_1: function(row)
    {
        var node = row.left;
        while (node !== row) 
        {
            this.uncoverColumn_1(node.head);
            node = node.left;
        }
        this.uncoverColumn_1(row.head);
    }
    ,
    solve_2: function(prefix,output)
    {
        var choices = (new java_util_ArrayList.$())._0();
        for (var i = 0; i < prefix.length; i=(i +1)|0) 
        {
            choices.add_1(this.advance_1(prefix[i]));
        }
        var result = this.search_2(choices,output);
        for (var i = ((prefix.length - 1)|0); i >= 0; i=(i -1)|0) 
        {
            this.rollback_1(choices.get_1(i));
        }
        return result;
    }
    ,
    solve_1: function(output)
    {
        return this.search_2((new java_util_ArrayList.$())._0(),output);
    }
    ,
});
//reference// org/apache/hadoop/examples/dancing/DancingLinks$ColumnHeader
//reference// java/util/ArrayList
//reference// org/apache/hadoop/examples/dancing/DancingLinks$Node
//load// java/lang/Object
